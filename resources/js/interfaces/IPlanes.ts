import { ReactNode } from 'react';

export interface IMonthPlan {
    name: string;
    price: number;
    products: string;
    icon: ReactNode;
    features: string[];
    isPopular: boolean;
    color: string;
    isAnnual?: boolean;
}
