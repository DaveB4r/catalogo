import { IVariationsData } from './IVariations';

export interface IProducto {
    id: number;
    nombre: string;
    imagen?: string | null;
    categoria_id: number;
    categoria: string;
    cantidad?: number | null;
    variations?: IVariationsData[];
    variations_ids?: string;
    variations_nombres?: string;
    variations_opciones?: string;
}
