import { NavigationMenu, NavigationMenuList } from '@/components/ui/navigation-menu';
import { useInitials } from '@/hooks/use-initials';
import { ICategorias } from '@/interfaces/ICategorias';
import { Menu } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Filters from './Filters';

type Props = {
    logo: string;
    name: string;
    categorias: ICategorias[];
    active: string;
    setActive: Dispatch<SetStateAction<string>>;
};

export default function Navbar({name, logo, categorias, active, setActive }: Props) {
    const host = window.location.origin;
    const [openFilter, setOpenFilter] = useState(false);
    const getInitials = useInitials();
    return (
        <NavigationMenu viewport={false} className="sticky top-0 z-50 mb-4 border-b-1 border-blue-950 bg-white pt-4 pb-2 w-full">
            <NavigationMenuList className="flex w-[calc(100vw-20px)] justify-between px-5">
                <button className="cursor-pointer rounded-2xl p-4 hover:bg-gray-200" onClick={() => setOpenFilter((openFilter) => !openFilter)}>
                    <Menu className="h-12 w-12" />
                </button>
                <div className="flex flex-col gap-2">
                    <p className="text-3xl font-black uppercase text-center">catalogo</p>
                    <p className="text-md font-semibold capitalize text-center">{name}</p>
                </div>
                <Avatar className="h-16 w-16 overflow-hidden rounded-full">
                    <AvatarImage src={`${host}/${logo}`} alt={name} />
                    <AvatarFallback className="rounded-lg bg-blue-950 text-white dark:bg-neutral-700">{getInitials(name)}</AvatarFallback>
                </Avatar>
                <Filters isOpen={openFilter} setIsOpen={setOpenFilter} categorias={categorias} active={active} setActive={setActive} />
            </NavigationMenuList>
        </NavigationMenu>
    );
}
