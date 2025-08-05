import ToastDiv from '@/components/custom/ToastDiv';
import UsuariosTable from '@/components/custom/UsuariosTable';
import { Button } from '@/components/ui/button';
import { IFlashUser } from '@/interfaces/IFlashUser';
import { IUser } from '@/interfaces/IUser';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
    usuarios: IUser[];
    flash?: IFlashUser;
};

type RegisterForm = {
    name: string;
    email: string;
    phone: string;
    file: File | null;
    password: string;
    password_confirmation: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Administrar Catalogos',
        href: '/admin_catalogos',
    },
];

export default function Admin({ usuarios, flash }: Props) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        delete: destroy,
    } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        file: null,
        phone: '',
        password_confirmation: '',
    });

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success_user' | 'error_user'>('success_user');
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [idToDelete, setIdToDelete] = useState(0);

    useEffect(() => {
        if (flash?.success_user) {
            setToastMessage(flash.success_user);
            setToastType('success_user');
            setShowToast(true);
        } else if (flash?.error_user) {
            setToastMessage(flash.error_user);
            setToastType('error_user');
            setShowToast(true);
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
        if (confirmDelete && idToDelete > 0) {
            destroy(route('user_destroy', idToDelete));
            setConfirmDelete(false);
            setIdToDelete(0);
        }
    }, [confirmDelete, idToDelete]);

    const handleDelete = (userId: number) => {
        console.log(userId);
        setShowConfirm(true);
        setIdToDelete(userId);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Catalogos" />
            <div className="mt-12 flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {showToast && <ToastDiv toastMessage={toastMessage} toastType={toastType} />}
                {showConfirm && (
                    <ToastDiv
                        toastMessage="Realmente dese eliminar este catalogo"
                        toastType="error"
                        confirm={showConfirm}
                        setConfirmDelete={setConfirmDelete}
                        setShowConfirm={setShowConfirm}
                    />
                )}
                <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
                    <h1 className="text-2xl font-bold">Catalogos</h1>
                    <Link href="/register">
                        <Button className="cursor-pointer">
                            <Plus className="m-2 h-4 w-4" /> Registrar Catalogo
                        </Button>
                    </Link>
                </div>
                <div className="w-full px-4">
                    <UsuariosTable usuarios={usuarios} onClickDelete={handleDelete} />
                </div>
            </div>
        </AppLayout>
    );
}
