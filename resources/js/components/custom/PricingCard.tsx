import { formatWithSeparator } from '@/helpers/formartted';
import { IMonthPlan } from '@/interfaces/IPlanes';
import { Check } from 'lucide-react';
import { Card } from '../ui/card';

type Props = {
    plan: IMonthPlan;
    duration: string;
};

const PricingCard = ({ plan, duration }: Props) => {
    const isPremium = plan.isPopular || (plan.name === 'Avanzado' && duration === 'Anual');

    const formattedPrice = formatWithSeparator(String(plan.price));
    const sobrante = Math.floor(plan.price / 12) % 1000;
    const monthlyEquivalent = duration === 'Anual' ? formatWithSeparator(String(Math.floor(plan.price / 12) - sobrante)) : null;
    const isAnnualDiscount = duration === 'Anual';

    return (
        <Card
            className={`my-6 flex h-full w-full transform flex-col items-start p-6 text-left transition-transform duration-500 ease-out ${isPremium && 'scale-[1.03] ring-4 ring-amber-300/60'}`}
        >
            {(plan.isPopular || isAnnualDiscount || plan.name === 'Gratis') && (
                <div
                    className={`absolute -top-3 right-4 rounded-full px-3 py-1 text-xs font-bold uppercase ${isPremium ? 'bg-amber-300 text-white shadow-md shadow-amber-300/50' : 'bg-green-500 text-white'}`}
                >
                    {plan.isPopular ? 'Más Popular' : plan.name === 'Gratis' ? '1 Mes Gratis' : '2 Meses Gratis'}
                </div>
            )}

            <div className="mb-4 flex items-center space-x-3">
                {plan.icon}
                <h2 className="text-xl font-bold tracking-tight text-gray-900">{plan.name}</h2>
            </div>

            <div className="mb-4">
                <p className="text-5xl font-extrabold text-gray-900">${formattedPrice}</p>
                <p className="mt-1 text-sm font-semibold text-gray-500">{duration === 'Mensual' ? 'por mes' : 'por año'}</p>
                {monthlyEquivalent && (
                    <p className="5 mt-1 rounded-md bg-gray-100 px-2 py-0 text-xs font-medium text-gray-700">
                        Equivalente a ${monthlyEquivalent}/mes aprox.
                    </p>
                )}
            </div>
            <div className="mb-6 h-px w-full bg-gray-200" />

            <div className="mb-6 w-full">
                <p className="text-lg font-semibold text-gray-800">
                    Productos incluidos: <span className={`font-extrabold ${plan.color}`}>{plan.products}</span>
                </p>
            </div>

            <ul className="mb-6 flex flex-grow flex-col space-y-3 text-gray-700">
                {plan.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center text-sm font-medium">
                        <Check className={`mr-2 h-4 w-4 flex-shrink-0 ${plan.color}`} />
                        {feature}
                    </li>
                ))}
                {plan.features.length > 3 && (
                    <li className="flex items-center text-sm font-medium text-gray-500 italic">
                        <Check className={`mr-2 h-4 w-4 flex-shrink-0 opacity-50`} />
                        {plan.features[3]} y más...
                    </li>
                )}
            </ul>
        </Card>
    );
};

export default PricingCard;
