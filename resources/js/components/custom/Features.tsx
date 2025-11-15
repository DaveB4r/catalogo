import { Share2, ShoppingCart, Smartphone, Zap } from 'lucide-react';
import AnimateSection from '../animate-ui/AnimateSection';

const Features = () => {
    const features = [
        {
            icon: <Zap className="h-6 w-6" />,
            title: 'Creación Instantánea',
            description: 'Sube tus productos y en minutos tendrás tu catálogo digital listo para compartir y vender. ¡Sin códigos ni complicaciones!',
            color: 'text-indigo-600 bg-indigo-100',
        },
        {
            icon: <ShoppingCart className="h-6 w-6" />,
            title: 'Carrito de Compras Integrado',
            description: 'Tus clientes añaden productos al carrito y te envían el pedido por WhatsApp. ¡Más ventas sin pagar comisiones!',
            color: 'text-green-600 bg-green-100',
        },
        {
            icon: <Share2 className="h-6 w-6" />,
            title: 'Tu Propio Link Personalizado',
            description: 'Recibe un enlace único (ej: micatalogofacil.com/c/tu-tienda) que puedes promocionar en todas tus redes.',
            color: 'text-yellow-600 bg-yellow-100',
        },
        {
            icon: <Smartphone className="h-6 w-6" />,
            title: 'Diseño Móvil Primero',
            description: 'Tu catálogo se ve perfecto en cualquier dispositivo, garantizando la mejor experiencia de compra para tus clientes.',
            color: 'text-red-600 bg-red-100',
        },
    ];
    return (
        <AnimateSection id="caracteristicas" className="bg-white py-24" duration={2}>
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Diseñado para Vender. Creado para ser Fácil.</h2>
                <p className="mx-auto mb-16 max-w-3xl text-xl text-gray-500">
                    Olvídate de procesos complejos. Tu catálogo es una herramienta poderosa, accesible y lista para generar pedidos.
                </p>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <div
                            className="rounded-xl border bg-card p-6 text-left text-card-foreground shadow-sm transition-all duration-300 hover:border-amber-300 hover:shadow-lg"
                            key={index}
                        >
                            <div className={`mb-4 inline-flex rounded-lg p-3 ${feature.color}`}>{feature.icon}</div>
                            <h3 className="mb-3 text-xl font-semibold text-gray-900">{feature.title}</h3>
                            <p className="text-gray-500">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AnimateSection>
    );
};

export default Features;
