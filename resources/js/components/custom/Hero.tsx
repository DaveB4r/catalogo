import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Phone } from 'lucide-react';
const Hero = () => {
    return (
        <section className="w-screen overflow-hidden">
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="items-center lg:grid lg:grid-cols-12 lg:gap-12">
                    {/*Image/ mockup */}
                    <div className="relative col-span-6 mt-12 content-center lg:mt-0">
                        <motion.img
                            initial={{
                                opacity: 0,
                                x: -50,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                duration: 1.8,
                                ease: 'easeOut',
                            }}
                            src="/images/phone-mockup.webp"
                            alt="cell-phone"
                            className="mx-auto w-48 md:w-96"
                        />
                    </div>
                    {/*Text Content */}
                    <div className="col-span-6 text-center lg:text-left">
                        <span className="iniline-flex text-shadow-lg mb-4 items-center rounded-full border border-amber-200 bg-indigo-100 px-4 py-1 text-lg font-medium text-cyan-500">
                            ¡La forma más fácil de vender en línea!
                        </span>
                        <h1 className="mb-6 text-5xl leading-tight font-extrabold text-gray-900 md:text-6xl">
                            Crea tu{' '}
                            <span className="text-amber-300" style={{ textShadow: '0 2px 1px #000' }}>
                                Catálogo Digital
                            </span>{' '}
                            en Minutos y Vende Más
                        </h1>
                        <p className="mx-auto mb-8 max-w-lg text-xl text-gray-500 lg:mx-0">
                            El catálogo online más fácil de usar, con carrito de compras integrado y link propio.
                        </p>
                        <Button variant="default" className='flex gap-2 cursor-pointer' size="lg"><Phone />Contactar</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
