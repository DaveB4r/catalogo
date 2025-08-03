import { useAppContext } from '@/context/AppContext';
import { useState } from 'react';
import Cart from './Cart';

type Props = {
    phone: string;
};

const FloatButton = ({ phone }: Props) => {
    const { state } = useAppContext();
    const [openCart, setOpenCart] = useState(false);
    return (
        <div>
            <div className="fixed right-0 bottom-0">
                <button className="relative" onClick={() => setOpenCart((openCart) => !openCart)}>
                    <img
                        src="/images/shopping-cart.webp"
                        alt="cart"
                        className="sticky my-4 cursor-pointer rounded-lg border-2 border-gray-300"
                        width={60}
                        height={60}
                    />
                    <div className="absolute top-1 grid h-[25px] w-[25px] place-items-center rounded-full bg-red-600 text-[14px] text-white">
                        {state.length}
                    </div>
                </button>
            </div>
            <Cart isOpen={openCart} setIsOpen={setOpenCart} phone={phone} />
        </div>
    );
};

export default FloatButton;
