import { ActionType } from '@/interfaces/IAction';
import { IProducto } from '@/interfaces/IProducto';
import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';

const path = window.location.pathname;
const storeName = path.substring(path.lastIndexOf('/') + 1);
const initialState: IProducto[] = JSON.parse(localStorage.getItem(`cart_${storeName}`) as string) ? [...JSON.parse(localStorage.getItem(`cart_${storeName}`) as string)] : [];

const reducer = (state: IProducto[], action: ActionType): IProducto[] => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const productIndex = state.findIndex((item) => item.id === action.product.id);            
            if (productIndex >= 0) {
                const updatedState = [...state];
                updatedState[productIndex] = {
                    ...updatedState[productIndex],
                    cantidad: Number(updatedState[productIndex].cantidad) + 1,
                };
                localStorage.setItem(`cart_${storeName}`, JSON.stringify(updatedState));
                return JSON.parse(localStorage.getItem(`cart_${storeName}`) as string);
            }
            localStorage.setItem(`cart_${storeName}`, JSON.stringify([...state, { ...action.product, cantidad: 1 }]));
            return JSON.parse(localStorage.getItem(`cart_${storeName}`) as string);
        case 'CHANGE_QUANTITY':
            const index = state.findIndex((item) => item.id === action.productId);
            const updatedState = [...state];
            updatedState[index] = {
                ...updatedState[index],
                cantidad: action.quantity === 'INCREMENT' ? Number(updatedState[index].cantidad) + action.units : action.quantity === "DECREMENT" ? Number(updatedState[index].cantidad) - action.units : Number(action.units),
            };
            localStorage.setItem(`cart_${storeName}`, JSON.stringify(updatedState));
            return updatedState;
        case 'REMOVE_FROM_CART':
            const storeRemove = action.store ? action.store : storeName;
            localStorage.setItem(`cart_${storeRemove}`, JSON.stringify([...state.filter((item) => !(item.id === action.productId))]));
            return JSON.parse(localStorage.getItem(`cart_${storeRemove}`) as string);
        case 'RESET_CART':
            return [];
        default:
            return state;
    }
};

type AppContextType = {
    state: IProducto[];
    dispatch: Dispatch<ActionType>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('Error');
    }
    return context;
};
