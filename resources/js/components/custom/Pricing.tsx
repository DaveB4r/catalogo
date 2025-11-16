import { IMonthPlan } from '@/interfaces/IPlanes';
import { DollarSign, Rocket, User, Zap } from 'lucide-react';
import AnimateSection from '../animate-ui/AnimateSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import PricingCard from './PricingCard';
import { Link } from '@inertiajs/react';

const Pricing = () => {
    const monthlyPlans: IMonthPlan[] = [
        {
            name: 'Simple',
            price: 59000,
            products: '1 a 150',
            icon: <DollarSign className="h-6 w-6 text-green-500" />,
            features: ['Acceso básico a funciones', 'Hasta 150 productos', 'Soporte estándar'],
            isPopular: false,
            color: 'text-green-500',
        },
        {
            name: 'Profesional',
            price: 79000,
            products: '151 a 300',
            icon: <Zap className="h-6 w-6 text-cyan-500" />,
            features: ['Todas las funciones básicas', 'Hasta 300 productos', 'Prioridad en el soporte', 'Analíticas avanzadas'],
            isPopular: true,
            color: 'text-cyan-500',
        },
        {
            name: 'Avanzado',
            price: 99000,
            products: '301 a 600',
            icon: <Rocket className="h-6 w-6 text-indigo-500" />,
            features: ['Todas las funciones Pro', 'Hasta 600 productos', 'Integraciones premium', 'Consultoría mensual'],
            isPopular: false,
            color: 'text-indigo-500',
        },
    ];

    const annualPlans: IMonthPlan[] = monthlyPlans.map((plan) => ({
        ...plan,
        price: plan.price * 10,
        isAnnual: true,
    }));

    const plans = (duration: string) => {
        return duration === 'Mensual' ? monthlyPlans : annualPlans;
    };

    return (
        <AnimateSection id="precios" className="bg-gray-50 p-4 font-sans sm:p-10 dark:bg-gray-900" duration={6.5}>
            <div className="mx-auto max-w-7xl">
                <header className="mb-12 text-center">
                    <h1 className="text-gay-900 mb-4 text-4xl leading-tight font-extrabold capitalize sm:text-5xl">conoce nuestros planes</h1>
                    <p className="mx-auto max-w-2xl text-xl text-gray-600">
                        Escoge el plan que mas se adapte a tu capacidad de pago y el numero de productos que necesites!
                    </p>
                </header>
                <div className="mb-10 flex w-full flex-col items-center justify-center">
                    <Tabs defaultValue="mensual">
                        <TabsList className="mx-auto w-full border">
                            <TabsTrigger value="mensual">Planes Mensuales</TabsTrigger>
                            <TabsTrigger value="anual">Planes Anuales</TabsTrigger>
                        </TabsList>
                        <TabsContent value="mensual">
                            <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
                                {plans('Mensual').map((plan) => (
                                    <div key={`${plan.name}-mensual`} className="flex">
                                        <PricingCard plan={plan} duration="Mensual" />
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="anual">
                            <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
                                {plans('Anual').map((plan) => (
                                    <div key={`${plan.name}-anual`} className="flex">
                                        <PricingCard plan={plan} duration="Anual" />
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                    <Link href='/register' className="flex justify-center items-center gap-2 my-20 w-full cursor-pointer rounded-lg border-2 border-amber-300 bg-amber-300 p-4 text-xl font-black hover:bg-amber-500 hover:text-white md:w-6/12">
                        <User /> Registrate
                    </Link>
                </div>
            </div>
        </AnimateSection>
    );
};

export default Pricing;
