import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from '@inertiajs/react';
import { NavigationMenuList } from '@radix-ui/react-navigation-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '../ui/navigation-menu';

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
    {
        title: 'Registrate',
        href: '#registro',
    },
    {
        title: 'Iniciar Sesion',
        href: 'login',
    },
];

const MainMenu = () => {
    const isMobile = useIsMobile();
    return (
        <NavigationMenu viewport={isMobile} className="sticky top-0 z-50 w-full bg-[#f9fdfa]">
            <NavigationMenuList className="flex w-screen flex-wrap items-center justify-center bg-transparent opacity-90">
                <NavigationMenuItem className="w-full md:w-auto">
                    <NavigationMenuLink asChild>
                        <img src="/images/logo.webp" alt="logo" width={80} height={80} className="mx-auto" />
                    </NavigationMenuLink>
                </NavigationMenuItem>
                {components.map((component, index) => (
                    <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                            asChild
                            className={`${navigationMenuTriggerStyle()} cursor-pointer ${component.title === 'Iniciar Sesion' && 'bg-yellow-400'} ${component.title === 'Registrate' && 'bg-cyan-400'}`}
                        >
                            <Link href={component.href} className="text-[1.2rem]">
                                {component.title}
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default MainMenu;
