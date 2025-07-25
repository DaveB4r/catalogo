import { useAppContext } from '@/context/AppContext';
import { Phone, Trash2, X } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '../ui/button';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    phone: string;
};

export default function Cart({ isOpen, setIsOpen, phone }: Props) {
    const host = window.location.origin;
    const { state, dispatch } = useAppContext();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTotal(0)
        state.map((product) => {
            setTotal((total) => {
                const price = Number(String(product.precio).replaceAll('.', ''));
                const quantity = Number(product.cantidad);
                total += (price * quantity);
                return total;
            });
        });
    }, [state]);

    const removeCart = (productId: number) => {
        dispatch({ type: 'REMOVE_FROM_CART', productId });
    };

    const handleQuantity = (productId: number, quantity: string) => {
        dispatch({ type: 'CHANGE_QUANTITY', productId, quantity });
    };

    const handleSendOrder = () => {
        const phoneNumber = phone;
        let message = '¡Hola! Quisiera hacer el siguiente pedido:\n\n';
        state.forEach((product) => {
            let variations = '';
            product?.variations?.map((variation) => (variations += `\n*${variation.nombre}*: ${variation.opciones}`));
            message += `*Imagen:* ${host}/${product.imagen}\n*Producto:* ${product.nombre}\n*Precio:*$ ${product.precio} ${variations}\n*Cantidad:* ${product.cantidad}\n_____________________________\n`;
        });
        message += `*Total:*$ ${Number(total).toLocaleString('es-CO')}\n¡Gracias!`;
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
                    state.map((product, index) => (
                        <div key={index} className="mb-4 flex items-center justify-between border-b-2 border-b-black pb-2">
                            <div className="flex w-full items-center">
                                <img
                                    src={`${host}/${product.imagen as string}`}
                                    alt={product.nombre}
                                    className="mr-4 h-32 w-32 rounded-md object-contain"
                                />
                                <div className="flex w-full flex-col gap-2">
                                    <p className="font-bold">{product.nombre}</p>
                                    <p className="font-bold">$ {product.precio}</p>
                                    <p className="text-sm text-gray-600">
                                        {product?.variations?.map((item) => (
                                            <span key={item.id}>
                                                {item.nombre}: {item.opciones}
                                                <br />
                                            </span>
                                        ))}
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
                <p className="my-2 text-right font-bold">Total: $ {Number(total).toLocaleString('es-CO')}</p>
                <Button variant="default" className="w-full cursor-pointer" onClick={handleSendOrder} disabled={total === 0}>
                    <Phone /> Enviar Pedido
                </Button>
            </div>
        </div>
    );
}
