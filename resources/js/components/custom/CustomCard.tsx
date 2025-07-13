import { useAppContext } from '@/context/AppContext';
import { IProducto } from '@/interfaces/IProducto';
import { IVariationsData } from '@/interfaces/IVariations';
import { Pencil, ShoppingCart, Trash2 } from 'lucide-react';
import { MouseEventHandler, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type Props = {
    id: number;
    title: string;
    image?: string | null;
    category?: string | null;
    category_id?: number;
    onClickEdit?: MouseEventHandler<HTMLButtonElement>;
    onClickDelete?: MouseEventHandler<HTMLButtonElement>;
    admin: boolean;
    type: 'category' | 'product';
    variations?: string;
};

export default function CustomCard({ id, title, image, category, category_id, admin, type, variations, onClickEdit, onClickDelete }: Props) {
    const host = window.location.origin;
    const { dispatch } = useAppContext();
    const [variationsIds, setVariationsIds] = useState<string[]>([]);
    const [variationsNames, setVariationsNames] = useState<string[]>([]);
    const [variationsOptions, setVariationsOptions] = useState<string[]>([]);
    const [variationsData, setVariationsData] = useState<IVariationsData[]>([]);
    const [buttonDisable, setButtonDisable] = useState(true);

    useEffect(() => {
        variationsData.forEach((variation) => {
            setButtonDisable(variation.nombre === '' && variation.opciones === '');
        });
    }, [variationsData]);

    useEffect(() => {
        if (variations) {
            setVariationsIds([]);
            setVariationsNames([]);
            setVariationsOptions([]);
            variations.split('++').forEach((variationItem, index) => {
                variationItem.split('|-|').forEach((variation) => {
                    if (index === 0) {
                        setVariationsIds((prev) => [...prev, variation]);
                        setVariationsData((prev) => [...prev, { id: Number(variation), nombre: '', opciones: '' }]);
                    } else if (index === 1) {
                        setVariationsNames((prev) => [...prev, variation]);
                    } else if (index === 2) {
                        setVariationsOptions((prev) => [...prev, variation]);
                    }
                });
            });
        }
    }, [variations]);

    const addToCart = () => {
        const product: IProducto = {
            id,
            nombre: title,
            imagen: image,
            categoria_id: Number(category_id),
            categoria: category as string,
            cantidad: 1,
            variations: variationsData,
        };
        dispatch({ type: 'ADD_TO_CART', product });
    };

    const handleSelectVariation = (id: string, nombre: string, value: string) => {
        setVariationsData((prev) => prev.map((i) => (i.id === Number(id) ? { ...i, nombre, opciones: value } : i)));
    };

    return (
        <Card className="min-h-12 w-72 p-0 transition-colors hover:bg-accent/50">
            <CardHeader className="relative flex flex-col items-center justify-between space-y-0 px-0">
                {image && <img src={`${host}/${image}`} alt={title} className="h-56 w-full object-contain" />}
                <CardTitle className="text-xl font-extrabold">{title}</CardTitle>
                {category && <h3 className="text-sm font-thin text-gray-600">{category}</h3>}
                {admin && (
                    <div className="absolute top-2 right-2 flex h-full w-full justify-end gap-2 transition-opacity hover:opacity-100 md:opacity-0">
                        <Button variant="ghost" size="icon" onClick={onClickEdit} className="cursor-pointer hover:bg-blue-400 hover:text-white">
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClickDelete}
                            className="cursor-pointer text-destructive hover:bg-destructive/90 hover:text-white"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </CardHeader>
            {!admin && type === 'product' && (
                <CardContent className="my-3">
                    {!admin && (
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
                    )}
                </CardContent>
            )}
        </Card>
    );
}
