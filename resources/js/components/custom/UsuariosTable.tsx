import { IUser } from '@/interfaces/IUser';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

type Props = {
    usuarios: IUser[];
    onClickDelete: (userId: number) => void;
    onClickEdit: (user: IUser) => void;
};

const UsuariosTable = ({ usuarios, onClickDelete, onClickEdit }: Props) => {
    return (
        <Table>
            <TableCaption>Lista de catalogos creados</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead className="hidden md:table-cell">Correo</TableHead>
                    <TableHead className="hidden md:table-cell">Telefono</TableHead>
                    <TableHead>N° Productos</TableHead>
                    <TableHead>Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {usuarios.map((catalogo) => (
                    <TableRow key={catalogo.id}>
                        <TableCell>{catalogo.id}</TableCell>
                        <TableCell>{catalogo.name}</TableCell>
                        <TableCell className="hidden md:table-cell">{catalogo.email}</TableCell>
                        <TableCell className="hidden md:table-cell">{catalogo.phone}</TableCell>
                        <TableCell>{catalogo.cantidad_productos}</TableCell>
                        {catalogo.id !== 1 && (
                            <TableCell>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="cursor-pointer text-blue-500 hover:bg-blue-500/90 hover:text-white"
                                    onClick={() => onClickEdit(catalogo)}
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="cursor-pointer text-destructive hover:bg-destructive/90 hover:text-white"
                                    onClick={() => onClickDelete(catalogo.id as number)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default UsuariosTable;
