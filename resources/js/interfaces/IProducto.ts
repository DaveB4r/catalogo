export interface IProducto {
    id: number;
    nombre: string;
    imagen?: string | null;
    tallas?: string | null;
    colores?: string | null;
    categoria_id: number;
    categoria: string;
    cantidad?: number | null;
}
