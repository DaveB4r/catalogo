import { useInitials } from '@/hooks/use-initials';
import { ICatalogo } from '@/interfaces/ICatalogo';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import AnimateSection from '../animate-ui/AnimateSection';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card } from '../ui/card';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

type Props = {
    catalogos: ICatalogo[] | null;
};

const Brands = ({ catalogos }: Props) => {
    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));
    const host = window.location.origin;
    const getInitials = useInitials();
    return (
        <AnimateSection id="brands" className="bg-white py-10" duration={5}>
            <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
                <h2 className="mb-12 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Empresas que confian en nosotros</h2>
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    opts={{
                        align: 'center',
                    }}
                >
                    <CarouselContent>
                        {catalogos?.map((catalogo, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p1">
                                    <a href={`/c/${String(catalogo.name).replaceAll(' ', '_')}`} target="_blank" rel="noopener noreferrer">
                                        <Card className="flex cursor-pointer flex-col items-center justify-center border-none">
                                            <Avatar className="transform transition-transform duration-300 hover:scale-150 w-28 h-28">
                                                <AvatarImage src={`${host}/${catalogo.avatar}`} alt={catalogo.name} />
                                                <AvatarFallback>{getInitials(catalogo.name)}</AvatarFallback>
                                            </Avatar>
                                            <p className="font-black">{catalogo.name}</p>
                                        </Card>
                                    </a>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </AnimateSection>
    );
};

export default Brands;
