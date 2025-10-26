import { IProducto } from './IProducto';

export type ActionType =
    | { type: 'ADD_TO_CART'; product: IProducto }
    | { type: 'REMOVE_FROM_CART'; productId: string; store?: string }
    | { type: 'CHANGE_QUANTITY'; productId: string; quantity: string; units: number }
    | { type: 'RESET_CART' };
