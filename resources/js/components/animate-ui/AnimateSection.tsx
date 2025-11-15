import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    className?: string;
    id?: string;
    duration?: number;
};

const AnimateSection = ({ children, className, id, duration = 2.5 }: Props) => {
    return (
        <motion.section
            viewport={{ once: false, amount: "all" }}
            id={id}
            className={className}
            initial={{
                opacity: 0,
                y: 30,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration,
                ease: 'easeOut',
            }}
        >
            {children}
        </motion.section>
    );
};

export default AnimateSection;
