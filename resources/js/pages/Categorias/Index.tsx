import CustomCard from '@/components/custom/CustomCard';
import CustomPopup from '@/components/custom/CustomFormPopup';
import ToastDiv from '@/components/custom/ToastDiv';
import { ICategorias } from '@/interfaces/ICategorias';
import { IFlash } from '@/interfaces/IFlash';
import { IForm, IFormInputs } from '@/interfaces/IForm';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';

type Props = {
    categorias: ICategorias[];
    flash?: IFlash;
};

const breadcumbs: BreadcrumbItem[] = [
    {
        title: 'Categorias',
        href: '/categorias',
    },
];

export default function CategoriasIndex({ categorias, flash }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingCategoria, setEditingCategoria] = useState<ICategorias | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [idToDelete, setIdToDelete] = useState(0);
    const [error, setError] = useState('');

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
    }, [flash]);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
                window.location.reload();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    useEffect(() => {
        if (confirmDelete && idToDelete > 0) {
            destroy(route('categorias.destroy', idToDelete));
            setIdToDelete(0);
            setConfirmDelete(false);
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
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        if (!data.nombre) {
            setError('Debe ingresar un nombre');
            return;
        }
        if (editingCategoria) {
            put(route('categorias.update', editingCategoria.id), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                    setEditingCategoria(null);
                },
            });
        } else {
            post(route('categorias.store'), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        }
    };

    const handleNew = () => {
        setEditingCategoria(null);
        setError('');
        setData({
            nombre: '',
        });
        setIsOpen(true);
    };

    const handleEdit = (categoria: ICategorias) => {
        setEditingCategoria(categoria);
        setData({
            nombre: categoria.nombre,
        });
        setIsOpen(true);
    };

    const handleDelete = (categoriaId: number) => {
        setShowConfirm(true);
        setIdToDelete(categoriaId);
    };

    const formInputs: IFormInputs[] = [
        {
            label: 'Nombre',
            placeholder: 'Nombre Categoria',
            inputType: 'text',
            inputId: 'nombre',
            inputValue: data.nombre,
            inputOnchange: (e) => setData('nombre', e.target.value),
            error,
        },
    ];

    const formElement: IForm = {
        onSubmit: handleSubmit,
        inputs: formInputs,
        buttonSubmit: editingCategoria ? 'Editar' : 'Crear',
    };

    return (
        <AppLayout breadcrumbs={breadcumbs}>
            <Head title="Categorias" />
            <div className="mt-12 flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {showToast && <ToastDiv toastMessage={toastMessage} toastType={toastType} />}
                {showConfirm && (
                    <ToastDiv
                        toastMessage="Realmente desea eliminar esta categoria"
                        toastType="error"
                        confirm={showConfirm}
                        setConfirmDelete={setConfirmDelete}
                        setShowConfirm={setShowConfirm}
                    />
                )}
                <div className="flex flex-col items-center justify-between md:flex-row">
                    <h1 className="text-2xl font-bold">Categorias</h1>
                    <CustomPopup
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        buttonName="Nueva Categoria"
                        dialogTitle={editingCategoria ? 'Editar Categoria' : 'Crear Categoria'}
                        form={formElement}
                        processing={processing}
                        onClick={handleNew}
                    />
                </div>
                <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {categorias.map((categoria) => (
                        <CustomCard
                            key={categoria.id}
                            id={categoria.id}
                            title={categoria.nombre}
                            type="category"
                            admin={true}
                            onClickEdit={() => handleEdit(categoria)}
                            onClickDelete={() => handleDelete(categoria.id)}
                            price={''}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
