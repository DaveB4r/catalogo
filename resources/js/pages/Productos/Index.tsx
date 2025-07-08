import CustomCard from '@/components/custom/CustomCard';
import CustomPopup from '@/components/custom/CustomFormPopup';
import ToastDiv from '@/components/custom/ToastDiv';
import { ICategorias } from '@/interfaces/ICategorias';
import { IFlash } from '@/interfaces/IFlash';
import { IForm, IFormInputs } from '@/interfaces/IForm';
import { IProducto } from '@/interfaces/IProducto';
import { IUser } from '@/interfaces/IUser';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Cog } from 'lucide-react';
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
    const [isOpen, setIsOpen] = useState(false);
    const [editingProducto, setEditingProducto] = useState<IProducto | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState('');
    const catalogoRoute = btoa(`${user.id}:${user.name}`)


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
        tallas: '',
        colores: '',
        categoria_id: '',
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
            tallas: '',
            colores: '',
            categoria_id: '',
        });
        setPreview('');
        setIsOpen(true);
    };

    const handleEdit = (producto: IProducto) => {
        setEditingProducto(producto);
        setData({
            nombre: producto.nombre,
            tallas: producto.tallas || '',
            colores: producto.colores || '',
            categoria_id: producto.categoria_id.toString(),
        });
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
            label: 'Tallas (separadas por coma)',
            placeholder: 'Ej: S, M, L, XL',
            inputType: 'text',
            inputId: 'tallas',
            inputValue: data.tallas,
            inputOnchange: (e) => setData('tallas', e.target.value),
        },
        {
            label: 'Colores (separados por coma)',
            placeholder: 'Ej: Rojo, Azul',
            inputType: 'text',
            inputId: 'colores',
            inputValue: data.colores,
            inputOnchange: (e) => setData('colores', e.target.value),
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
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {showToast && <ToastDiv toastMessage={toastMessage} toastType={toastType} />}
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between">
                        <h1 className="mr-4 text-2xl font-bold">Productos</h1>
                        <a href={`/catalogo/${catalogoRoute}`} target="_blank" rel="noopener noreferrer" className="hover:bg-accent/50 p-2 rounded-lg border border-gray-300">
                            <span className='flex gap-2 items-center hover:text-red-700'><Cog className="h-4 w-4" /> Ver como cliente</span>
                        </a>
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
                    />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {productos.map((producto) => (
                        <CustomCard
                            key={producto.id}
                            id={producto.id}
                            title={producto.nombre}
                            image={producto.imagen}
                            category={producto.categoria}
                            onClickEdit={() => handleEdit(producto)}
                            onClickDelete={() => handleDelete(producto.id)}
                            type='product'
                            admin={true}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
