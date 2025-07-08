import { useAppContext } from '@/context/AppContext';
import { Phone, Trash2, X } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Cart({ isOpen, setIsOpen }: Props) {
    const { state, dispatch } = useAppContext();
    const removeCart = (productId: number) => {
        dispatch({ type: 'REMOVE_FROM_CART', productId });
    };

    const handleQuantity = (productId: number, quantity: string) => {
        dispatch({ type: 'CHANGE_QUANTITY', productId, quantity });
    };

    const handleSendOrder = () => {
        const phoneNumber = '573158957774';
        let message = '¡Hola! Quisiera hacer el siguiente pedido:\n\n';
        state.forEach((product) => {
            message += `*Producto:* ${product.nombre}\n*Cantidad:* ${product.cantidad}\n*Talla:* ${product.tallas}\n*Color:* ${product.colores}\n_____________________________\n`;
        });
        message += '\n¡Gracias!';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div
            className={`fixed top-0 right-0 z-50 flex h-full w-full transform flex-col bg-white shadow-lg transition-transform duration-300 ease-in-out md:w-96 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
            <div className="flex items-center justify-between border-b p-4">
                <h2 className="font-bol text-xl">Carrito de Compras</h2>
                <button className="cursor-pointer text-3xl text-gray-600 hover:text-gray-900" onClick={() => setIsOpen(!isOpen)}>
                    <X />
                </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4">
                {state.length === 0 ? (
                    <p className="text-center text-gray-500">Tu carrito está vacío.</p>
                ) : (
                    state.map((product) => (
                        <div key={product.id} className="mb-4 flex items-center justify-between border-b-2 border-b-black pb-2">
                            <div className="flex w-full items-center">
                                <img
                                    src={`http://localhost:8000/${product.imagen as string}`}
                                    alt={product.nombre}
                                    className="mr-4 h-32 w-32 rounded-md object-contain"
                                />
                                <div className="flex w-full flex-col gap-4">
                                    <p className="font-bold">{product.nombre}</p>
                                    <p className="text-sm text-gray-600">
                                        Talla: {product.tallas}, Color: {product.colores}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            className="cursor-pointer text-lg font-black hover:bg-gray-500"
                                            onClick={() => handleQuantity(product.id, 'DECREMENT')}
                                            disabled={product.cantidad === 1}
                                        >
                                            -
                                        </Button>
                                        <span>{product.cantidad}</span>
                                        <Button
                                            className="cursor-pointer text-lg font-black hover:bg-gray-500"
                                            onClick={() => handleQuantity(product.id, 'INCREMENT')}
                                        >
                                            +
                                        </Button>
                                    </div>
                                    <Button variant="destructive" onClick={() => removeCart(product.id)} className="cursor-pointer">
                                        <Trash2 />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="border-t p-4">
                <Button variant="default" className="w-full cursor-pointer" onClick={handleSendOrder}>
                    <Phone /> Enviar Pedido
                </Button>
            </div>
        </div>
    );
}
