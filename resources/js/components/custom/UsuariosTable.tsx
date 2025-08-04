import { IUser } from '@/interfaces/IUser';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

type Props = {
    usuarios: IUser[];
};

const UsuariosTable = ({ usuarios }: Props) => {
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
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default UsuariosTable;
