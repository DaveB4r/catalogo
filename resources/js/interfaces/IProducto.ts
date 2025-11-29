import { IVariationsData } from './IVariations';

export interface IProducto {
    id: number;
    idCarrito?: string;
    nombre: string;
    imagen?: string | null;
    precio: string;
    categoria_id: number;
    categoria: string;
    cantidad?: number | null;
    variations?: IVariationsData[];
    variations_ids?: string;
    variations_nombres?: string;
    variations_opciones?: string;
    descripcion?: TrustedHTML;
    disponible?: number;
}
