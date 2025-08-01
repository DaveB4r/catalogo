import { useAppContext } from '@/context/AppContext';
import { IProducto } from '@/interfaces/IProducto';
import { IVariationsData } from '@/interfaces/IVariations';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type Props = {
    producto: IProducto;
};

const ProductView = ({ producto }: Props) => {
    const { dispatch } = useAppContext();
    const [variationsIds, setVariationsIds] = useState<string[]>([]);
    const [variationsNames, setVariationsNames] = useState<string[]>([]);
    const [variationsOptions, setVariationsOptions] = useState<string[]>([]);
    const [variationsData, setVariationsData] = useState<IVariationsData[]>([]);
    const [buttonDisable, setButtonDisable] = useState(true);

    useEffect(() => {
        setButtonDisable(variationsData.length > 0);
        variationsData.forEach((variation) => {
            setButtonDisable(variation.nombre === '' && variation.opciones === '');
        });
    }, [variationsData]);

    useEffect(() => {
        if (producto.variations_ids) {
            const variations = `${producto.variations_ids}++${producto.variations_nombres}++${producto.variations_opciones}`;
            setVariationsIds([]);
            setVariationsNames([]);
            setVariationsOptions([]);
            variations.split('++').forEach((variationItem, index) => {
                variationItem.split('|-|').forEach((variation) => {
                    if (index === 0 && variation != 'null') {
                        setVariationsIds((prev) => [...prev, variation]);
                        setVariationsData((prev) => [...prev, { id: Number(variation), nombre: '', opciones: '' }]);
                    } else if (index === 1 && variation != 'null') {
                        setVariationsNames((prev) => [...prev, variation]);
                    } else if (index === 2 && variation != 'null') {
                        setVariationsOptions((prev) => [...prev, variation]);
                    }
                });
            });
        }
    }, [producto.variations_ids]);

    const addToCart = () => {
        const product: IProducto = {
            id: producto.id,
            nombre: producto.nombre,
            imagen: producto.imagen,
            precio: producto.precio,
            categoria_id: Number(producto.categoria_id),
            categoria: producto.categoria as string,
            cantidad: 1,
            variations: variationsData,
        };
        dispatch({ type: 'ADD_TO_CART', product });
    };

    const handleSelectVariation = (id: string, nombre: string, value: string) => {
        setVariationsData((prev) => prev.map((i) => (i.id === Number(id) ? { ...i, nombre, opciones: value } : i)));
    };

    return (
        <div className="py-8">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="-mx-4 flex flex-col md:flex-row">
                    <div className="md:flex-1">
                        <div className="mb-4 h-[460px] rounded-lg bg-gray-300">
                            <img src={`/${producto.imagen}`} alt={producto.nombre} className="h-full w-full rounded-lg object-cover" />
                        </div>
                    </div>
                    <div className="px-4 md:flex-1">
                        <h2 className="mb-2 text-2xl font-bold text-gray-800">{producto.nombre}</h2>
                        <p className="mb-4 text-lg font-bold text-gray-600">{producto.categoria}</p>
                        <h3 className="text-3xl font-bold text-gray-900">$ {producto.precio}</h3>
                        <div>
                            <div>
                                {variationsIds.length > 0 && (
                                    <div className="my-2">
                                        {variationsIds.map((variation, index) => (
                                            <div className="mb3" key={index}>
                                                <Label>{variationsNames[index]}</Label>
                                                <Select onValueChange={(value) => handleSelectVariation(variation, variationsNames[index], value)}>
                                                    <SelectTrigger className="focus:ring-2 focus:ring-primary">
                                                        <SelectValue placeholder={`Seleccione ${variationsNames[index]}`} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {variationsOptions[index].split(',').map((item, indexOpt) => (
                                                            <SelectItem key={indexOpt} value={item}>
                                                                {item}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <Button variant="default" size="lg" className="w-full cursor-pointer" disabled={buttonDisable} onClick={addToCart}>
                                <ShoppingCart className="h-4 w-4" /> Agregar al carrito
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductView;
