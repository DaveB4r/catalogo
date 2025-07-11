import { useAppContext } from '@/context/AppContext';
import { IProducto } from '@/interfaces/IProducto';
import { Pencil, ShoppingCart, Trash2 } from 'lucide-react';
import { MouseEventHandler, useState } from 'react';
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
    sizes?: string[];
    colors?: string[];
};

export default function CustomCard({ id, title, image, category, category_id, admin, type, sizes, colors, onClickEdit, onClickDelete }: Props) {
    const host = window.location.origin;
    const { dispatch } = useAppContext();
    const [sizeSelected, setSizeSelected] = useState('');
    const [colorSelected, setColorSelected] = useState('');

    const addToCart = () => {
        const product: IProducto = {
            id,
            nombre: title,
            imagen: image,
            tallas: sizeSelected,
            colores: colorSelected,
            categoria_id: Number(category_id),
            categoria: category as string,
            cantidad: 1,
        };
        dispatch({ type: 'ADD_TO_CART', product });
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
                    {sizes ? (
                        <div className="mb-3">
                            <Label htmlFor="talla">Talla</Label>
                            <Select value={sizeSelected} onValueChange={(value) => setSizeSelected(value)}>
                                <SelectTrigger className="focus:ring-2 focus:ring-primary">
                                    <SelectValue placeholder="Seleccione talla" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sizes.map((selectOpt, index) => (
                                        <SelectItem key={index} value={selectOpt}>
                                            {selectOpt}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    ) : (
                        <div className="mb-3">
                            <Label>Talla</Label>
                            <p className="my-2 text-sm text-gray-500">No aplica</p>
                        </div>
                    )}
                    {colors ? (
                        <div className="mb-3">
                            <Label htmlFor="color">Color</Label>
                            <Select value={colorSelected} onValueChange={(value) => setColorSelected(value)}>
                                <SelectTrigger className="focus:ring-2 focus:ring-primary">
                                    <SelectValue placeholder="Seleccione Color" />
                                </SelectTrigger>
                                <SelectContent>
                                    {colors.map((selectOpt, index) => (
                                        <SelectItem key={index} value={selectOpt}>
                                            {selectOpt}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    ) : (
                        <div className="mb-3">
                            <Label>Color</Label>
                            <p className="my-2 text-sm text-gray-500">No aplica</p>
                        </div>
                    )}
                    {!admin && (
                        <Button
                            variant="default"
                            size="lg"
                            className="w-full cursor-pointer"
                            disabled={
                                (sizes && sizeSelected === '' && colors && colorSelected === '') ||
                                (colors && colorSelected === '') ||
                                (sizes && sizeSelected === '')
                            }
                            onClick={addToCart}
                        >
                            <ShoppingCart className="h-4 w-4" /> Agregar al carrito
                        </Button>
                    )}
                </CardContent>
            )}
        </Card>
    );
}
