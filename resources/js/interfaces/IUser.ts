export interface IUser {
    id?: number;
    name: string;
    email?: string;
    password?: string;
    password_confirmation?: string; 
    phone?: string;
    avatar?: File | null;
    cantidad_productos?: number;
}
