import { IProducto } from './IProducto';

export type ActionType =
    | { type: 'ADD_TO_CART'; product: IProducto }
    | { type: 'REMOVE_FROM_CART'; productId: number; store?: string }
    | { type: 'CHANGE_QUANTITY'; productId: number; quantity: string; units: number }
    | { type: 'RESET_CART' };
