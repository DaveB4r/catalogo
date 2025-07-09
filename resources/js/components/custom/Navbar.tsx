import Cart from '@/components/custom/Cart';
import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { useAppContext } from '@/context/AppContext';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

type Props = {
    phone: string;
}

export default function Navbar({phone}: Props) {
    const { state } = useAppContext();
    const [openCart, setOpenCart] = useState(false);
    return (
        <NavigationMenu viewport={false} className="mb-4 border-b-1 border-blue-950 pt-4 pb-2 top-0 sticky z-50 bg-white">
            <NavigationMenuList className="flex w-[calc(100vw-20px)] justify-between px-5">
                <NavigationMenuLink className="cursor-pointer text-2xl">Mi tienda</NavigationMenuLink>
                <div className="relative">
                    <div className="absolute top-[-1rem] left-[-1rem] bg-red-700 rounded-full w-8 h-8 flex justify-center items-center">
                        <span className="font-black text-white text-md text-center">{state.length}</span>
                    </div>
                    <button className="mr-4 cursor-pointer rounded-2xl p-4 hover:bg-gray-200" onClick={() => setOpenCart((openCart) => !openCart)}>
                        <ShoppingCart className="h-6 w-6" />
                    </button>
                </div>
                <Cart isOpen={openCart} setIsOpen={setOpenCart} phone={phone}/>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
