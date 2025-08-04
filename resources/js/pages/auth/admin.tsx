import UsuariosTable from '@/components/custom/UsuariosTable';
import { Button } from '@/components/ui/button';
import { IUser } from '@/interfaces/IUser';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

type Props = {
    usuarios: IUser[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Administrar Catalogos',
        href: '/admin_catalogos',
    },
];

export default function Admin({ usuarios }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Catalogos" />
            <div className="mt-12 flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
                    <h1 className="text-2xl font-bold">Catalogos</h1>
                    <Link href="/register">
                        <Button className='cursor-pointer'>
                            <Plus className="m-2 h-4 w-4" /> Registrar Catalogo
                        </Button>
                    </Link>
                </div>
                <div className="w-full px-4">
                    <UsuariosTable usuarios={usuarios} />
                </div>
            </div>
        </AppLayout>
    );
}
