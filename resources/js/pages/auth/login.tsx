import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeClosed, LoaderCircle, Lock, Mail } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Inicia sesion con tu cuenta" description="Ingresa tu usuario y contraseña">
            <Head title="Inicio sesion" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo</Label>
                        <InputGroup>
                            <InputGroupInput
                                id="email"
                                type="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="correo@ejemplo.com"
                            />
                            <InputGroupAddon className="px-2" align="inline-start">
                                <Mail />
                            </InputGroupAddon>
                        </InputGroup>
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Contraseña</Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                    Olvido Contraseña?
                                </TextLink>
                            )}
                        </div>
                        <InputGroup>
                            <InputGroupInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Contraseña"
                            />
                            <InputGroupAddon className="px-2" align="inline-start">
                                <Lock />
                            </InputGroupAddon>
                            <InputGroupAddon className="cursor-pointer px-2" align="inline-end" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeClosed /> : <Eye />}
                            </InputGroupAddon>
                        </InputGroup>
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                        />
                        <Label htmlFor="remember">Recuerdame</Label>
                    </div>

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Iniciar sesion
                    </Button>
                    <Link href='/register' className="text-center text-teal-500 hover:text-blue-500 hover:underline">Aun no tienes una cuenta? Registrate</Link>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
