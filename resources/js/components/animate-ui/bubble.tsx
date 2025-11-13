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
                color: '255,195,0',
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
                color: '255,10,50',
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
                color: '255,0,0',
                style: 'w-30 h-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                animate: {
                    scale: [1, 0.4, 1.1, 1],
                    rotate: [0, 90, -90, 0],
                    y: [0, 100, -30, 0]
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
                color: '0, 180, 220',
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
                color: '50,150,255',
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
                color: '3,174,164',
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
        <div className="font-inter relative flex h-10/12 w-screen overflow-hidden bg-[#f9fdfa]">
            <div className="absolute inset-0 z-0">
                {spheres.map((sphere, index) => (
                    <motion.div
                        key={index}
                        className={`absolute rounded-full opacity-100 ${sphere.style}`}
                        style={{ backgroundColor: `rgba(${sphere.color}, 0.6)` }}
                        animate={sphere.animate}
                        transition={sphere.transition}
                    />
                ))}
            </div>
            <div className="relative z-10">{children}</div>
        </div>
    );
}
