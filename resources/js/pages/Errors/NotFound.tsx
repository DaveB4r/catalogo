import { motion } from 'framer-motion';
import { MoveLeft, Package, Search, ShoppingBag, Store, Tag } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const NotFound = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1200,
        height: typeof window !== 'undefined' ? window.innerHeight : 800,
    });

    // Track mouse for parallax effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: e.clientX - windowSize.width / 2,
                y: e.clientY - windowSize.height / 2,
            });
        };

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, [windowSize]);

    // Generate random particles (stars + debris)
    const particles = useMemo(() => {
        return Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
        }));
    }, []);

    // Random floating product icons
    const floatingIcons = useMemo(() => {
        const icons = [ShoppingBag, Package, Tag, Search];
        return Array.from({ length: 8 }).map((_, i) => {
            const Icon = icons[i % icons.length];
            return {
                id: `icon-${i}`,
                Icon,
                left: 10 + Math.random() * 80, // Keep somewhat central
                top: 10 + Math.random() * 80,
                size: 20 + Math.random() * 20,
                duration: 5 + Math.random() * 5,
                rotate: Math.random() * 360,
            };
        });
    }, []);

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-900 font-sans text-white selection:bg-amber-300 selection:text-black">
            {/* Background Gradient Adjusted for E-commerce Warmth */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black" />
            {/* Floating Icons Layer (Behing main content) */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-0"
                animate={{ x: mousePos.x * -0.03, y: mousePos.y * -0.03 }}
                transition={{ type: 'spring', stiffness: 40, damping: 20 }}
            >
                {floatingIcons.map(({ id, Icon, left, top, size, duration, rotate }) => (
                    <motion.div
                        key={id}
                        className="absolute text-slate-700 opacity-40"
                        style={{ left: `${left}%`, top: `${top}%` }}
                        animate={{
                            y: [0, -30, 0],
                            rotate: [rotate, rotate + 10, rotate],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <Icon size={size} />
                    </motion.div>
                ))}
            </motion.div>
            {/* Parallax Stars Layer */}
            <motion.div
                className="absolute inset-0 z-0"
                animate={{
                    x: mousePos.x * -0.01,
                    y: mousePos.y * -0.01,
                }}
                transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            >
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute rounded-full bg-white"
                        style={{
                            left: `${p.left}%`,
                            top: `${p.top}%`,
                            width: p.size,
                            height: p.size,
                        }}
                        animate={{
                            opacity: [0.1, 0.8, 0.1],
                            scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                            duration: p.duration,
                            delay: p.delay,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </motion.div>
            {/* Main Content Container */}
            <div className="relative z-10 flex max-w-4xl flex-col items-center justify-center px-4 text-center">
                {/* 404 Background Text */}
                <motion.div
                    className="absolute -z-10 text-[10rem] leading-none font-black text-slate-800/50 select-none md:text-[16rem]"
                    animate={{ x: mousePos.x * 0.04, y: mousePos.y * 0.04 }}
                    transition={{ type: 'spring', stiffness: 30, damping: 20 }}
                >
                    404
                </motion.div>

                {/* Floating Logo Container */}
                <motion.div
                    className="relative mb-8"
                    animate={{
                        y: [0, -15, 0],
                        rotate: [0, 2, 0],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    {/* Glow effect behind logo to make it pop on dark bg */}
                    <div className="absolute inset-0 scale-150 rounded-full bg-white/10 blur-3xl" />
                    {/* The logo */}
                    <motion.img
                        src="/images/logo.webp"
                        alt="Mi Catalogo Facil Logo"
                        className="relative w-64 object-contain drop-shadow-2xl md:w-96"
                        whileHover={{ scale: 1.05, rotate: -2 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    />
                </motion.div>

                {/* Message - Entry Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm"
                >
                    <h2 className="mb-3 text-2xl font-bold tracking-tight text-white md:text-4xl">No Encuentras Lo Que Buscas?</h2>
                    <p className="mx-auto mb-8 max-w-md text-lg font-light text-slate-300">Nosotros tampoco....</p>

                    {/* Action Buttons */}
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <motion.button
                            onClick={() => window.history.back()}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-600 bg-slate-800 px-6 py-3 font-medium text-slate-200 transition-colors hover:border-slate-400"
                        >
                            <span className="relative flex items-center gap-2">
                                <MoveLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                                Volver
                            </span>
                        </motion.button>
                        <motion.button
                            onClick={() => (window.location.href = '/')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative cursor-pointer rounded-xl bg-amber-300 px-8 py-3 font-bold text-black shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all hover:shadow-[0_0_30px_rgba(234,179,8,0.5)]"
                        >
                            <span className="flex items-center gap-2">
                                <Store size={18} />
                                Volver al Inicio
                            </span>
                        </motion.button>
                    </div>
                </motion.div>
            </div>
            {/* Bottom decorative fade */}
            <div className="pointer-events-none absolute bottom-0 h-32 w-full bg-gradient-to-t from-slate-900 to-transparent" />
        </div>
    );
};

export default NotFound;
