import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from '@inertiajs/react';
import { LogIn, Menu, User, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '../ui/navigation-menu';

const components: { title: string; href: string }[] = [
    {
        title: 'Inicio',
        href: '#inicio',
    },
    {
        title: 'Nosotros',
        href: '#nosotros',
    },
    {
        title: 'Servicios',
        href: '#servicios',
    },
    {
        title: 'Ventajas',
        href: '#ventajas',
    },
    {
        title: 'Precios',
        href: '#precios',
    },
    {
        title: 'Contacto',
        href: '#contacto',
    },
];

const MainMenu = () => {
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full border-b bg-white shadow-sm">
            <div className="container mx-auto flex items-center justify-between p-4">
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {!isOpen ? <Menu className="h-6 w-6" /> : <X className='h-6 w-6'/>}
                </Button>
                <img src="/images/logo.webp" alt="logo" width={80} height={80} />
                <NavigationMenu viewport={isMobile} className="hidden md:flex">
                    <NavigationMenuList>
                        {components.map((component, index) => (
                            <NavigationMenuItem key={index}>
                                <NavigationMenuLink href={component.href} className={navigationMenuTriggerStyle()}>
                                    {component.title}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="flex gap-4">
                    <Link href="login" className="hidden gap-2 rounded-xl bg-amber-300 p-3 md:flex">
                        <LogIn />
                        Iniciar Sesion
                    </Link>
                    <Link href="register" className="hidden gap-2 rounded-xl bg-cyan-300 p-3 md:flex">
                        <User />
                        Registrate
                    </Link>
                </div>
            </div>
            {isOpen && (
                <div className="flex flex-wrap items-center justify-center gap-3 p-4 md:hidden">
                    {components.map((component, index) => (
                        <Link key={index} href={component.href} className="text-gray-700 hover:text-black">
                            {component.title}
                        </Link>
                    ))}
                    <Link href="login" className="gap-2 rounded-xl bg-amber-300 p-2 md:hidden">
                        Iniciar Sesion
                    </Link>
                    <Link href="register" className="gap-2 rounded-xl bg-cyan-300 p-2 md:hidden">
                        Registrate
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default MainMenu;
