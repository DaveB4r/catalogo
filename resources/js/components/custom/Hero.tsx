import { motion } from 'framer-motion';
const Hero = () => {
    return (
        <div className="flex w-screen items-center justify-center gap-4" id='inicio'>
            <motion.img
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.8,
                    ease: 'easeOut',
                }}
                src="/images/phone-mockup.png"
                alt="cell-phone"
                width={350}
            />
            {/* <img src="/images/phone-mockup.png" alt="cell-phone" width={350}/> */}
            <div className="flex flex-col items-start justify-center gap-4">
                <p className="text-6xl font-black">Crea tus catalogos</p>
                <p className="text-xl font-thin">Facil de usar y a un precio super especial</p>
            </div>
        </div>
    );
};

export default Hero;
