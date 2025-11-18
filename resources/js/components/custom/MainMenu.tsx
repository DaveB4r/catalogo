import { useIsMobile } from '@/hooks/use-mobile';
import { IUser } from '@/interfaces/IUser';
import { Link } from '@inertiajs/react';
import { LogIn, Menu, User, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '../ui/navigation-menu';
import DropDownUser from './DropDownUser';

const components: { title: string; href: string }[] = [
    {
        title: 'Inicio',
        href: '#inicio',
    },
    {
        title: 'Características',
        href: '#caracteristicas',
    },
    {
        title: '¿Cómo funciona?',
        href: '#como-funciona',
    },
    {
        title: 'Testimonios',
        href: '#testimonios',
    },
    {
        title: 'Precios',
        href: '#precios',
    },
    {
        title: 'Contacto',
        href: '#final-cta',
    },
];

type Props = {
    user: IUser | null;
};

const MainMenu = ({ user }: Props) => {
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = useState(false);
    const scrollTo = (id: string) => {
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
            <div className="container mx-auto flex items-center justify-between p-4">
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {!isOpen ? <Menu className="h-6 w-6" /> : <X className="h-6 w-6" />}
                </Button>
                <img src="/images/logo.webp" alt="logo" width={80} height={80} />
                <NavigationMenu viewport={isMobile} className="hidden md:flex">
                    <NavigationMenuList>
                        {components.map((component, index) => (
                            <NavigationMenuItem key={index}>
                                <NavigationMenuLink
                                    href={component.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollTo(component.href);
                                    }}
                                    className={navigationMenuTriggerStyle()}
                                >
                                    {component.title}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
                {user ? (
                    <DropDownUser username={user.name} />
                ) : (
                    <div className="flex gap-4">
                        <Link href="login" className="hidden gap-2 rounded-xl bg-amber-300 p-3 hover:bg-yellow-500 md:flex">
                            <LogIn />
                            Iniciar Sesion
                        </Link>
                        <Link href="register" className="hidden gap-2 rounded-xl bg-cyan-300 p-3 hover:bg-sky-500 md:flex">
                            <User />
                            Registrate
                        </Link>
                    </div>
                )}
            </div>
            {isOpen && (
                <div className="flex flex-wrap items-center justify-center gap-3 p-4 md:hidden">
                    {components.map((component, index) => (
                        <Link key={index} href={component.href} className="text-gray-700 hover:text-black">
                            {component.title}
                        </Link>
                    ))}
                    {user ? (
                        <DropDownUser username={user.name} />
                    ) : (
                        <>
                            <Link href="login" className="gap-2 rounded-xl bg-amber-300 p-2 hover:bg-amber-500 md:hidden">
                                Iniciar Sesion
                            </Link>
                            <Link href="register" className="gap-2 rounded-xl bg-cyan-300 p-2 md:hidden">
                                Registrate
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default MainMenu;
