import AnimateSection from '../animate-ui/AnimateSection';

const steps = [
    {
        num: 1,
        title: 'Regístrate.',
        description: 'Crea tu cuenta en segundos. Solo necesitas un correo y una contraseña.',
    },
    {
        num: 2,
        title: 'Sube tus Productos.',
        description: 'Añade fotos, precios, descripciones. El sitema organiza todo automáticamente.',
    },
    {
        num: 3,
        title: '¡Comparte y Vende!',
        description: 'Obtén tu link y compártelo en WhatsApp, Instagram, Facebook y más. ¡Empieza a recibir pedidos!',
    },
];
const StepSection = () => {
    return (
        <AnimateSection id="como-funciona" className="bg-gray-50 py-24" duration={3.5}>
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">¿Cómo funciona? Es tan fácil como 1-2-3</h2>
                <p className="mx-auto mb-16 max-w-3xl text-xl text-gray-500">Comienza a vender en línea sin la necesidad de un desarrollador web.</p>
                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                    {steps.map((step) => (
                        <div key={step.num} className="relative flex flex-col items-center p-4">
                            <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-amber-300 text-xl font-extrabold text-white shadow-md ring-4 ring-amber-300">
                                {step.num}
                            </div>
                            {step.num < 3 && (
                                <div className="absolute top-6 left-[calc(50%+40px)] hidden w-[calc(100%-80px)] border-t-2 border-dashed border-gray-300 md:block" />
                            )}
                            <h3 className="mb-3 text-2xl font-semibold text-gray-900">{step.title}</h3>
                            <p className="max-w-xs text-gray-500">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AnimateSection>
    );
};

export default StepSection;
