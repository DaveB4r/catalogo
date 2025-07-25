import CustomCard from '@/components/custom/CustomCard';
import CustomPopup from '@/components/custom/CustomFormPopup';
import ToastDiv from '@/components/custom/ToastDiv';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';
import { ICategorias } from '@/interfaces/ICategorias';
import { IFlash } from '@/interfaces/IFlash';
import { IForm, IFormInputs } from '@/interfaces/IForm';
import { IProducto } from '@/interfaces/IProducto';
import { IUser } from '@/interfaces/IUser';
import { IVariationsData } from '@/interfaces/IVariations';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Cog, Share2 } from 'lucide-react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

type Props = {
    productos: IProducto[];
    categorias: ICategorias[];
    user: IUser;
    flash?: IFlash;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Catalogo',
        href: '/productos',
    },
];

export default function ProductosIndex({ productos, categorias, user, flash }: Props) {
    const { dispatch } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const [editingProducto, setEditingProducto] = useState<IProducto | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [idToDelete, setIdToDelete] = useState(0);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState('');
    const [variationsData, setVariationsData] = useState<IVariationsData[]>([]);
    const [errors, SetErrors] = useState({
        nombre: '',
        categoria: '',
        precio: '',
        imagen: '',
    });
    const [variationsError, setVariationsError] = useState('');

    useEffect(() => {
        if (flash?.success) {
            setToastMessage(flash.success);
            setToastType('success');
            setShowToast(true);
        } else if (flash?.error) {
            setToastMessage(flash.error);
            setToastType('error');
            setShowToast(true);
        } else if (flash?.id) {
            setToastMessage('Producto editado satisfactoriamente');
            setToastType('success');
            setShowToast(true);
            uploadImage(flash?.id);
        } else if (flash?.deleted) {
            setToastMessage('Producto elminado satisfactoriamente');
            setToastType('success');
            setShowToast(true);
            dispatch({ type: 'REMOVE_FROM_CART', productId: flash?.deleted, store: String(user.name).replaceAll(' ', '_') });
        }
    }, [flash]);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    useEffect(() => {
        setData('variationsData', variationsData as never[]);
    }, [variationsData]);

    useEffect(() => {
        if (confirmDelete && idToDelete > 0) {
            destroy(route('productos.destroy', idToDelete));
            setIdToDelete(0);
        }
    }, [confirmDelete, idToDelete]);

    const {
        data,
        setData,
        post,
        put,
        processing,
        reset,
        delete: destroy,
    } = useForm({
        nombre: '',
        precio: '',
        categoria_id: '',
        variationsData: [],
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        SetErrors({
            nombre: '',
            categoria: '',
            precio: '',
            imagen: '',
        });
        setVariationsError('');
        let variationError = false;
        if (!data.nombre) {
            SetErrors((prev) => ({ ...prev, nombre: 'Debe ingresar el nombre.' }));
            return;
        } else if (!data.categoria_id) {
            SetErrors((prev) => ({ ...prev, categoria: 'Debe seleccionar una categoria.' }));
            return;
        } else if (!data.precio) {
            SetErrors((prev) => ({ ...prev, precio: 'Debe ingresar un precio.' }));
            return;
        } else if (!file && !editingProducto) {
            SetErrors((prev) => ({ ...prev, imagen: 'Debe seleccionar una imagen.' }));
            return false;
        }
        if (data.variationsData.length > 0) {
            data.variationsData.map((variation: IVariationsData) => {
                if (!variation.nombre || !variation.opciones) {
                    setVariationsError('Por favor ingrese un valor');
                    variationError = true;
                    return;
                }
            });
            if (variationError) {
                return;
            }
        } else {
            setVariationsError('');
        }
        
        if (editingProducto) {
            put(route('productos.update', editingProducto.id), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        } else {
            post(route('productos.store'), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        }
        setPreview('');
    };

    const uploadImage = (id: number) => {
        if (file) {
            router.post(`/producto_image/${id}`, {
                file,
            });
            setFile(null);
        }
    };

    const handleNew = () => {
        setEditingProducto(null);
        setData({
            nombre: '',
            categoria_id: '',
            precio: '',
            variationsData: [],
        });
        SetErrors({
            nombre: '',
            categoria: '',
            precio: '',
            imagen: '',
        });
        setVariationsError('');
        setPreview('');
        setIsOpen(true);
    };

    const handleEdit = (producto: IProducto) => {
        setEditingProducto(producto);
        setData({
            nombre: producto.nombre,
            precio: producto.precio,
            categoria_id: producto.categoria_id.toString(),
            variationsData: [],
        });
        if (producto.variations_ids && producto.variations_nombres && producto.variations_opciones) {
            const separator = '|-|';
            const variationsIds = producto.variations_ids.split(separator);
            const variationsNombres = producto.variations_nombres?.split(separator);
            const variationsOpciones = producto.variations_opciones?.split(separator);
            let array = [];
            for (let i = 0; i < variationsIds.length; i++) {
                const variationObject: IVariationsData = {
                    id: Number(variationsIds[i]),
                    nombre: variationsNombres[i],
                    opciones: variationsOpciones[i],
                };
                array.push(variationObject);
            }
            setVariationsData(array);
        }
        setPreview(producto.imagen as string);
        setIsOpen(true);
    };

    const handleDelete = (productoId: number) => {
        setShowConfirm(true);
        setIdToDelete(productoId);
    };

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target!.files![0];
        if (!file) return;
        setFile(file);
        previewFile(file);
    };

    const previewFile = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
    };

    const handleShare = () => {
        const shareLink = `${window.location.origin}/c/${String(user.name).replaceAll(' ', '_')}`;
        const shareMessage = `Dale un vistazo a mi nuevo catalogo: ${shareLink}`;
        const encodedMessage = encodeURIComponent(shareMessage);
        const url = `https://wa.me/?text=${encodedMessage}`;
        window.open(url, '_blank');
    };

    const formatWithSeparator = (value: string) => {
        const cleaned = value.replace(/[^\d]/g, '');
        return cleaned ? Number(cleaned).toLocaleString('es-CO') : '';
    };

    const formInputs: IFormInputs[] = [
        {
            label: 'Nombre',
            placeholder: 'Nombre Producto',
            inputType: 'text',
            inputId: 'nombre',
            inputValue: data.nombre,
            inputOnchange: (e) => setData('nombre', e.target.value),
            error: errors.nombre,
        },
        {
            label: 'Categoria',
            placeholder: 'Categoria',
            inputType: 'select',
            inputId: 'categoria',
            inputValue: data.categoria_id,
            selectOnchange: (value) => {
                if (value != '') {
                    setData('categoria_id', value);
                }
            },
            selectOptions: categorias,
            selectTitle: 'Selecciona una Categoria',
            error: errors.categoria,
        },
        {
            label: 'Precio',
            placeholder: 'Precio producto sin puntos ni comas',
            inputType: 'text',
            inputId: 'precio',
            inputValue: data.precio,
            inputOnchange: (e) => setData('precio', formatWithSeparator(e.target.value)),
            error: errors.precio,
        },
        {
            label: 'Imagen',
            placeholder: 'Imagen del producto',
            inputType: 'file',
            inputId: 'imagen',
            accept: 'image/jpeg, image/jpg, image/png, image/webp',
            inputOnchange: (e) => handleChangeImage(e),
            error: errors.imagen,
        },
    ];

    const formElement: IForm = {
        onSubmit: handleSubmit,
        inputs: formInputs,
        buttonSubmit: editingProducto ? 'Actualizar Producto' : 'Crear Producto',
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Catalogo" />
            <div className="mt-10 flex h-full w-full flex-1 flex-col gap-4 rounded-xl py-4 md:p-4">
                {showToast && <ToastDiv toastMessage={toastMessage} toastType={toastType} />}
                {showConfirm && (
                    <ToastDiv
                        toastMessage="Realmente desea eliminar este producto"
                        toastType="error"
                        confirm={showConfirm}
                        setConfirmDelete={setConfirmDelete}
                        setShowConfirm={setShowConfirm}
                    />
                )}
                <div className="flex flex-col items-center justify-between md:flex-row">
                    <div className="my-2 flex flex-col items-center justify-between gap-2 md:flex-row md:gap-4">
                        <h1 className="mr-4 text-2xl font-bold">Productos</h1>
                        <Button variant="outline" className="cursor-pointer hover:text-red-600">
                            <a
                                href={`/c/${String(user.name).replaceAll(' ', '_')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2"
                            >
                                <Cog className="h-4 w-4" /> Ver como cliente
                            </a>
                        </Button>
                        <Button variant="outline" className="cursor-pointer hover:text-green-600" onClick={handleShare}>
                            <Share2 /> Compartir
                        </Button>
                    </div>
                    <CustomPopup
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        buttonName="Nuevo Producto"
                        dialogTitle={editingProducto ? 'Editar Producto' : 'Crear Producto'}
                        form={formElement}
                        processing={processing}
                        preview={preview}
                        onClick={handleNew}
                        hasVariations={true}
                        variationsData={variationsData}
                        setVariationsData={setVariationsData}
                        isEditing={editingProducto ? true : false}
                        categoriesLength={categorias.length}
                        variationsError={variationsError}
                    />
                </div>
                <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {productos.map((producto) => (
                        <CustomCard
                            key={producto.id}
                            id={producto.id}
                            title={producto.nombre}
                            price={producto.precio}
                            image={producto.imagen}
                            category={producto.categoria}
                            onClickEdit={() => handleEdit(producto)}
                            onClickDelete={() => handleDelete(producto.id)}
                            type="product"
                            admin={true}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
