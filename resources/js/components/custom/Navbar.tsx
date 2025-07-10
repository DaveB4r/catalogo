import Cart from '@/components/custom/Cart';
import { NavigationMenu, NavigationMenuList } from '@/components/ui/navigation-menu';
import { useAppContext } from '@/context/AppContext';
import { useInitials } from '@/hooks/use-initials';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type Props = {
    logo: string;
    name: string;
    phone: string;
};

export default function Navbar({ phone, name, logo }: Props) {
    const { state } = useAppContext();
    const [openCart, setOpenCart] = useState(false);
    const getInitials = useInitials();
    return (
        <NavigationMenu viewport={false} className="sticky top-0 z-50 mb-4 border-b-1 border-blue-950 bg-white pt-4 pb-2">
            <NavigationMenuList className="flex w-[calc(100vw-20px)] justify-between px-5">
                <Avatar className="h-16 w-16 overflow-hidden rounded-full">
                    <AvatarImage src={`http://localhost:8000/${logo}`} alt={name} />
                    <AvatarFallback className="rounded-lg bg-blue-950 text-white dark:bg-neutral-700">{getInitials(name)}</AvatarFallback>
                </Avatar>
                <div className="relative">
                    <div className="absolute top-[-1rem] left-[-1rem] flex h-8 w-8 items-center justify-center rounded-full bg-red-700">
                        <span className="text-md text-center font-black text-white">{state.length}</span>
                    </div>
                    <button className="mr-4 cursor-pointer rounded-2xl p-4 hover:bg-gray-200" onClick={() => setOpenCart((openCart) => !openCart)}>
                        <ShoppingCart className="h-6 w-6" />
                    </button>
                </div>
                <Cart isOpen={openCart} setIsOpen={setOpenCart} phone={phone} />
            </NavigationMenuList>
        </NavigationMenu>
    );
}
