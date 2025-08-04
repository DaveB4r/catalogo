import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { IProducto } from '@/interfaces/IProducto';
import { Pencil, Trash2 } from 'lucide-react';

type Props = {
    productos: IProducto[];
    onClickEdit: (producto: IProducto) => void;
    onClickDelete:  (productoId: number) => void;
};

const ProductosTable = ({ productos, onClickEdit, onClickDelete }: Props) => {
    const host = window.location.origin;
    return (
        <Table>
            <TableCaption>Lista de productos agregados</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[10%] font-black md:text-lg">Imagen</TableHead>
                    <TableHead className="w-[10%] font-black md:text-lg">Nombre</TableHead>
                    <TableHead className="hidden w-[10%] font-black md:table-cell md:text-lg">Categoria</TableHead>
                    <TableHead className="hidden w-[10%] font-black md:table-cell md:text-lg">Precio</TableHead>
                    <TableHead className="w-[20%] font-black md:text-lg">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {productos.map((producto) => (
                    <TableRow key={producto.id}>
                        <TableCell>
                            <img src={`${host}/${producto.imagen}`} className="max-h-24 w-24 object-cover" alt={producto.nombre} />
                        </TableCell>
                        <TableCell>
                            <p className="font-xs text-ellipsis">{producto.nombre}</p>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{producto.categoria}</TableCell>
                        <TableCell className="hidden md:table-cell">${producto.precio}</TableCell>
                        <TableCell>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer text-blue-500 hover:bg-blue-500/90 hover:text-white"
                                onClick={() => onClickEdit(producto)}
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer text-destructive hover:bg-destructive/90 hover:text-white"
                                onClick={() => onClickDelete(producto.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ProductosTable;
