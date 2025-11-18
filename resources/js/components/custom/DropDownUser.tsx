import { Link } from '@inertiajs/react';
import { LayoutGrid, LogOut, User } from 'lucide-react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu';

type Props = {
    username: string;
};

const DropDownUser = ({ username }: Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{username}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href="/productos" className="flex items-center gap-2">
                            <LayoutGrid /> Admin
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link className="flex items-center gap-2" href={route('profile.edit')}>
                            <User /> Perfil
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link method="post" as="button" href={route('logout')} className="flex items-center gap-2 text-red-700">
                            <LogOut /> Cerrar sesion
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropDownUser;
