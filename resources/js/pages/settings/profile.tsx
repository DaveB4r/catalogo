import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { ChangeEvent, FormEventHandler, useState } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Configuracion de perfil',
        href: '/settings/profile',
    },
];

type ProfileForm = {
    name: string;
    email: string;
    phone: string;
};

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const host = window.location.origin;
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        name: auth.user.name,
        email: auth.user.email,
        phone: auth.user.phone,
    });
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState(auth.user.avatar ? `${host}/${auth.user.avatar}` : '');

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (file) {
            router.post(`/avatar/${auth.user.id}`, { file });
            setFile(null);
        }
        patch(route('profile.update'), {
            preserveScroll: true,
        });
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Configuracion de perfil" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Informacion de perfil" description="Actualiza tus datos" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombre tienda</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Nombre de la tienda"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Correo Electronico</Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Correo Electronico"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone">Celular</Label>
                            <small className='text-destructive'>(prefijo pais) seguido de Numero de celular sin espacios: 573001234567</small>

                            <Input
                                id="phone"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                required
                                autoComplete="phone"
                                placeholder="Numero de celular"
                            />

                            <InputError className="mt-2" message={errors.phone} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="avatar">Foto de Perfil</Label>

                            <Input
                                id="avatar"
                                type="file"
                                className="mt-1 block w-full"
                                onChange={(e) => handleChangeImage(e)}
                                placeholder="Foto de perfil"
                            />
                            {preview && (
                                <div className="space-y-2">
                                    <img src={preview} alt="preview" width={270} height={150} className="h-36 w-36 rounded-xl object-cover" />
                                </div>
                            )}
                        </div>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="-mt-4 text-sm text-muted-foreground">
                                    Tu correo no ha sido verificado.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Clic aqui para reenviar link de verificacon.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        Un nuevo link de verificacion ha sido enviado a tu correo.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Actualizar</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Actualizado</p>
                            </Transition>
                        </div>
                    </form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}
