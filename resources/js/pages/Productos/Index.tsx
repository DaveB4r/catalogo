import CustomCard from '@/components/custom/CustomCard';
import CustomPopup from '@/components/custom/CustomFormPopup';
import ToastDiv from '@/components/custom/ToastDiv';
import { Button } from '@/components/ui/button';
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
    lastVariationId: number;
    flash?: IFlash;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Catalogo',
        href: '/productos',
    },
];

export default function ProductosIndex({ productos, categorias, user, lastVariationId, flash }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingProducto, setEditingProducto] = useState<IProducto | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState('');
    const [variationsData, setVariationsData] = useState<IVariationsData[]>([]);

    useEffect(() => {
        if (flash?.success) {
            setToastMessage(flash.success);
            setToastType('success');
            setShowToast(true);
        } else if (flash?.error) {
            setToastMessage(flash.error);
            setToastType('error');
            setShowToast(true);
        }
        if (flash?.id) {
            uploadImage(flash?.id);
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
        if (variationsData.length > 0) {
            setData('variationsData', variationsData as never[]);
        }
    }, [variationsData]);

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
        categoria_id: '',
        variationsData: [],
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
            variationsData: [],
        });
        setPreview('');
        setIsOpen(true);
    };

    const handleEdit = (producto: IProducto) => {
        setEditingProducto(producto);
        setData({
            nombre: producto.nombre,
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
        destroy(route('productos.destroy', productoId));
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
        const shareLink = `${window.location.origin}/catalogo/${String(user.name).replaceAll(' ', '_')}`;
        const shareMessage = `Dale un vistazo a mi nuevo catalogo: ${shareLink}`;
        const encodedMessage = encodeURIComponent(shareMessage);
        const url = `https://wa.me/?text=${encodedMessage}`;
        window.open(url, '_blank');
    };

    const formInputs: IFormInputs[] = [
        {
            label: 'Nombre',
            placeholder: 'Nombre Producto',
            inputType: 'text',
            inputId: 'nombre',
            inputValue: data.nombre,
            inputOnchange: (e) => setData('nombre', e.target.value),
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
        },
        {
            label: 'Imagen',
            placeholder: 'Imagen del producto',
            inputType: 'file',
            inputId: 'imagen',
            inputOnchange: (e) => handleChangeImage(e),
        },
    ];

    const formElement: IForm = {
        onSubmit: handleSubmit,
        inputs: formInputs,
        buttonSubmit: editingProducto ? 'editar' : 'Crear',
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Catalogo" />
            <div className="flex w-full h-full flex-1 flex-col gap-4 rounded-xl py-4 md:p-4">
                {showToast && <ToastDiv toastMessage={toastMessage} toastType={toastType} />}
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-2 my-2 md:gap-4">
                        <h1 className="mr-4 text-2xl font-bold">Productos</h1>
                        <Button variant="outline" className="cursor-pointer hover:text-red-600">
                            <a
                                href={`/catalogo/${String(user.name).replaceAll(' ', '_')}`}
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
                        lastVariationId={lastVariationId}
                    />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto">
                    {productos.map((producto) => (
                        <CustomCard
                            key={producto.id}
                            id={producto.id}
                            title={producto.nombre}
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
