import { Dispatch, SetStateAction } from 'react';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type Props = {
    orderBy: string;
    setOrderBy: Dispatch<SetStateAction<string>>;
};

const OrderBy = ({ orderBy, setOrderBy }: Props) => {
    return (
        <div className="px-4">
            <Label htmlFor="orderBy">Ordenar por:</Label>
            <Select value={orderBy} onValueChange={(value) => setOrderBy(value)}>
                <SelectTrigger className="focus:ring-2 focus:ring-primary">
                    <SelectValue placeholder="Seleccione un orden" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="nombreAsc">Nombre Ascendente</SelectItem>
                    <SelectItem value="nombreDesc">Nombre Descendente</SelectItem>
                    <SelectItem value="precioAsc">Precio menor a mayor</SelectItem>
                    <SelectItem value="precioDesc">Precio mayor a menor</SelectItem>
                    <SelectItem value="categoriaAsc">Categoria Ascendente</SelectItem>
                    <SelectItem value="categoriaDesc">Categoria Descendente</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default OrderBy;
