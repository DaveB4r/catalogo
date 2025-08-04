import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ICategorias } from '@/interfaces/ICategorias';
import { Pencil, Trash2 } from 'lucide-react';

type Props = {
    categorias: ICategorias[];
    onClickEdit: (categoria: ICategorias) => void;
    onClickDelete: (categoriaId: number) => void;
};

const CategoriasTable = ({ categorias, onClickEdit, onClickDelete }: Props) => {
    return (
        <Table>
            <TableCaption>Lista de categorias agregadas</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categorias.map((categoria) => (
                    <TableRow key={categoria.id}>
                        <TableCell>{categoria.nombre}</TableCell>
                        <TableCell>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer text-blue-500 hover:bg-blue-500/90 hover:text-white"
                                onClick={() => onClickEdit(categoria)}
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer text-destructive hover:bg-destructive/90 hover:text-white"
                                onClick={() => onClickDelete(categoria.id)}
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

export default CategoriasTable;
