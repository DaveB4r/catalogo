import { ActionType } from '@/interfaces/IAction';
import { IProducto } from '@/interfaces/IProducto';
import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';

const initialState: IProducto[] = [];

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
                return updatedState;
            }
            return [...state, { ...action.product, cantidad: 1 }];
        case 'CHANGE_QUANTITY':
            const index = state.findIndex((item) => item.id === action.productId);
            const updatedState = [...state];
            updatedState[index] = {
                ...updatedState[index],
                cantidad: action.quantity === 'INCREMENT' ? Number(updatedState[index].cantidad) + 1 : Number(updatedState[index].cantidad) - 1,
            };
            return updatedState;
        case 'REMOVE_FROM_CART':
            return state.filter((item) => !(item.id === action.productId));
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
