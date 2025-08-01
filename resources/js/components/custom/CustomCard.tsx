import { useAppContext } from '@/context/AppContext';
import { IProducto } from '@/interfaces/IProducto';
import { IVariationsData } from '@/interfaces/IVariations';
import { Pencil, ShoppingCart, Trash2 } from 'lucide-react';
import { Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type Props = {
    id: number;
    title: string;
    image?: string | null;
    price: string;
    category?: string | null;
    category_id?: number;
    onClickEdit?: MouseEventHandler<HTMLButtonElement>;
    onClickDelete?: MouseEventHandler<HTMLButtonElement>;
    admin: boolean;
    type: 'category' | 'product';
    variations?: string;
    numColumns?: string;
    setProductId?: Dispatch<SetStateAction<number>>;
    setOpenDialog?: Dispatch<SetStateAction<boolean>>;
};

export default function CustomCard({
    id,
    title,
    image,
    price,
    category,
    category_id,
    admin,
    type,
    variations,
    numColumns,
    onClickEdit,
    onClickDelete,
    setProductId,
    setOpenDialog,
}: Props) {
    const host = window.location.origin;
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
        if (variations) {
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
    }, [variations]);

    const addToCart = () => {
        const product: IProducto = {
            id,
            nombre: title,
            imagen: image,
            precio: price,
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

    const showProductDetail = (id: number) => {
        setProductId && setProductId(id);
        setOpenDialog && setOpenDialog(true);
    };

    return (
        <Card className="min-h-12 max-w-84 gap-0 border-gray-400 py-0 transition-colors hover:bg-accent/50 md:p-4">
            <CardHeader className="relative flex flex-col items-center justify-between space-y-0 px-0">
                {image && (
                    <img
                        src={`${host}/${image}`}
                        alt={title}
                        className={`min-h-56 w-full rounded-lg md:h-72 md:object-contain ${numColumns === 'grid-cols-1' ? 'h-56 object-contain' : 'object-cover'}`}
                        onClick={() => showProductDetail(id)}
                    />
                )}
                <div className="mb-2 flex w-[80%] flex-col items-center justify-center gap-0 border-b-1 border-b-black py-2">
                    <CardTitle className="text-lg font-extrabold capitalize md:text-xl">{title}</CardTitle>
                    {category && <h3 className="text-sm/tight font-thin text-gray-500">{category}</h3>}
                    {type === 'product' && <CardDescription className="text-lg font-bold text-black md:text-lg">$ {price}</CardDescription>}
                </div>

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
                <CardContent className="px-0">
                    {!admin && (
                        <div className="flex items-center justify-between px-1">
                            {variationsIds.length > 0 && (
                                <div className="mx-1 min-w-[60%]">
                                    {variationsIds.map((variation, index) => (
                                        <div className="mb-1" key={index}>
                                            <Label className="font-black text-black capitalize">{variationsNames[index]}</Label>
                                            <Select onValueChange={(value) => handleSelectVariation(variation, variationsNames[index], value)}>
                                                <SelectTrigger className="p-1 text-[10px] ring-1 focus:ring-2 focus:ring-primary">
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
                            <button
                                className={`mb-1 flex w-full items-center justify-center rounded-xl py-1 ${buttonDisable ? 'bg-gray-300' : 'bg-black'}`}
                                disabled={buttonDisable}
                                onClick={addToCart}
                            >
                                <ShoppingCart className="h-9 w-9 text-white" />
                            </button>
                        </div>
                    )}
                </CardContent>
            )}
        </Card>
    );
}
