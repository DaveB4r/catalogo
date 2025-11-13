import { motion } from 'framer-motion';
import { ReactNode, useMemo } from 'react';

type Props = {
    children: ReactNode;
};

export default function BubbleBackground({ children }: Props) {
    /**
     * We use useMemo to define the properties of our spheres
     * This prevents the from being recalculated on every render
     * Each sphere has its own style, animation keyframes and transition
     */
    const spheres = useMemo(
        () => [
            {
                //yellow
                color: '224,195,81,0.8',
                color2: '251,224,102,0.9',
                color3: '89,74,16,0.6',
                style: 'w-96 h-96 top-10 left-10',
                animate: {
                    x: [0, 200, -100, 0],
                    y: [0, -100, 100, 0],
                },
                transition: {
                    duration: 20,
                    repeat: Infinity,
                    repeatType: 'mirror' as const,
                    ease: 'easeInOut' as const,
                },
            },
            {
                //Red
                color: '255,10,50,0.8',
                color2: '245,93,119,0.9',
                color3: '64,10,19,0.6',
                style: 'w-72 h-72 bottom-20 right-20',
                animate: {
                    x: [0, -150, 50, 0],
                    y: [0, 100, -50, 0],
                },
                transition: {
                    duration: 25,
                    repeat: Infinity,
                    repeatType: 'mirror' as const,
                    ease: 'easeInOut' as const,
                    delay: 3,
                },
            },
            {
                // red
                color: '255,181,181,0.8',
                color2: '255,0,0,0.6',
                color3: '54,4,4,0.9',
                style: 'w-30 h-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                animate: {
                    scale: [1, 0.4, 1.1, 1],
                    rotate: [0, 90, -90, 0],
                    y: [0, 100, -30, 0],
                },
                transition: {
                    duration: 10,
                    repeat: Infinity,
                    repeatType: 'mirror' as const,
                    ease: 'easeInOut' as const,
                    delay: 1,
                },
            },
            {
                // cyan
                color: '152, 228, 245, 0.6',
                color2: '0, 180, 220, 0.8',
                color3: '2, 50, 61, 0.9',
                style: 'w-64 h-64 top-1/3 right-1/4',
                animate: {
                    x: [0, -100, 100, 0],
                    y: [0, 150, -100, 0],
                },
                transition: {
                    duration: 22,
                    repeat: Infinity,
                    repeatType: 'mirror' as const,
                    ease: 'easeInOut' as const,
                    delay: 5,
                },
            },
            {
                //blue
                color: '181,212,245, 0.6',
                color2: '50,150,255, 0.8',
                color3: '1,23,46, 0.9',
                style: 'w-56 h-56 bottom-1/4 left-1/4',
                animate: {
                    x: [0, 100, -150, 0],
                    y: [0, -100, 100, 0],
                },
                transition: {
                    duration: 28,
                    repeat: Infinity,
                    repeatType: 'mirror' as const,
                    ease: 'easeInOut' as const,
                    delay: 2,
                },
            },
            {
                // green
                color: '127,227,221, 0.6',
                color2: '3,174,164, 0.8',
                color3: '1,74,70, 0.9',
                style: 'w-20 h-20 bottom-1/2 left-1/3',
                animate: {
                    x: [0, 50, -50, 0],
                    y: [0, -100, 100, 0],
                },
                transition: {
                    duration: 28,
                    repeat: Infinity,
                    repeatType: 'mirror' as const,
                    ease: 'easeInOut' as const,
                    delay: 2,
                },
            },
        ],
        [],
    );

    return (
        <div className="font-inter relative flex h-screen w-screen overflow-hidden bg-[#f9fdfa] md:h-8/12">
            <div className="absolute inset-0 z-0">
                {spheres.map((sphere, index) => (
                    <motion.div
                        key={index}
                        className={`absolute rounded-full opacity-100 ${sphere.style}`}
                        style={{ background: `radial-gradient(circle at 30% 30%, rgba(${sphere.color}), rgba(${sphere.color2}), rgba(${sphere.color3}))`}}
                        animate={sphere.animate}
                        transition={sphere.transition}
                    />
                ))}
            </div>
            <div className="relative z-10">{children}</div>
        </div>
    );
}
