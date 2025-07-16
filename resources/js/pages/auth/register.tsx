import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { ChangeEvent, FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

type RegisterForm = {
    name: string;
    email: string;
    phone: string;
    file: File | null;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        file: null,
        phone: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            forceFormData: true,
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const [preview, setPreview] = useState('');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Registrar Usuario',
            href: '/register',
        },
    ];

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target!.files![0];
        if (!file) return;
        setData('file', file);
        previewFile(file);
    };

    const previewFile = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Registrar" />
            <form className="mt-4 flex flex-col items-center justify-center gap-6" onSubmit={submit}>
                <div className="grid w-96 gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Nombre de la tienda"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="correo@ejemplo.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="phone">Celular</Label>
                        <small className="text-destructive">(prefijo pais) seguido de Numero de celular sin espacios: 573001234567</small>
                        <Input
                            id="phone"
                            type="text"
                            required
                            tabIndex={3}
                            autoComplete="phone"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            disabled={processing}
                            placeholder="573129774545"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="avatar">Foto de Perfil</Label>
                        <Input
                            id="avatar"
                            type="file"
                            tabIndex={4}
                            onChange={(e) => handleChangeImage(e)}
                            disabled={processing}
                            placeholder="Foto de perfil"
                        />
                        {preview && (
                            <div className="space-y-2">
                                <img src={preview} alt="preview" width={270} height={150} className="h-36 w-36 rounded-xl object-cover" />
                            </div>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={5}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Contraseña"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirmar Contraseña</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={6}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirmar Contraseña"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Crear Usuario
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
