import BubbleBackground from '@/components/animate-ui/bubble';
import Features from '@/components/custom/Features';
import Hero from '@/components/custom/Hero';
import MainMenu from '@/components/custom/MainMenu';

export default function HomeIndex() {
    return (
        <div className="relative h-screen w-screen overflow-x-hidden bg-[#f9fdfa]">
            <MainMenu />
            <BubbleBackground>
                <Hero />
            </BubbleBackground>
            <Features />
        </div>
    );
}
