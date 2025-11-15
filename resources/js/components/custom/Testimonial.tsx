import AutoPlay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { Card } from '../ui/card';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import AnimateSection from '../animate-ui/AnimateSection';

const testimonials = [
    {
        quote: 'Desde que uso Mi Catálogo Fácil, mis pedidos se han duplicado. El carrito integrado simplifica todo y mis clientas lo aman. ¡Es como tener una tienda online sin pagar mensualidades caras!',
        name: 'María G.',
        title: 'Dueña de Imperio de la Moda Junín',
    },
    {
        quote: 'Mi Catálogo Fácil me ha ahorrado horas de trabajo cada semana. Ahora mis clientas pueden ver productos, elegir colores y hacer pedidos sin que yo esté encima. ¡Me encanta lo fácil que es!',
        name: 'Laura P.',
        title: 'Emprendedora de Moda Urbana',
    },
    {
        quote: 'Antes tenía que enviar fotos por WhatsApp una por una. Ahora solo mando mi enlace y listo. Mis ventas han aumentado porque todo se ve más profesional.',
        name: 'Ana R.',
        title: 'Propietaria de Boutique Rosé',
    },
    {
        quote: 'Lo mejor es que mis clientas pueden agregar productos al carrito y elegir tallas sin confundirse. Desde que uso la app, mis pedidos llegan más claros y ordenados.',
        name: 'Camila S.',
        title: 'Emprendedora de Accesorios',
    },
];

const Testimonial = () => {
    const plugin = useRef(AutoPlay({ delay: 3000, stopOnInteraction: true }));
    return (
        <AnimateSection id="testimonios" className="bg-white py-10" duration={5}>
            <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                <div className="mb-6 flex justify-center">
                    <img src="/images/logo-2.webp" alt="logo" width={150} />
                </div>
                <h2 className="mb-12 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">La opinión de nuestros clientes</h2>
                <Carousel plugins={[plugin.current]} className="w-full" onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset}>
                    <CarouselContent>
                        {testimonials.map((testimonial, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card className="border-l-4 border-amber-300 bg-amber-50/50 p-8 shadow-xl md:p-12">
                                        <blockquote className="text-xl leading-relaxed font-medium text-gray-800 italic md:text-2xl">
                                            &ldquo;{testimonial.quote}&rdquo;
                                        </blockquote>
                                        <footer className="mt-8">
                                            <p className="text-lg font-semibold text-amber-600">{testimonial.name}</p>
                                            <div className="text-gray-500">{testimonial.title}</div>
                                        </footer>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </AnimateSection>
    );
};

export default Testimonial;
