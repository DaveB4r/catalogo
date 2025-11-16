import BubbleBackground from '@/components/animate-ui/bubble';
import Features from '@/components/custom/Features';
import FinalCTA from '@/components/custom/FinalCTA';
import Footer from '@/components/custom/Footer';
import Hero from '@/components/custom/Hero';
import MainMenu from '@/components/custom/MainMenu';
import Pricing from '@/components/custom/Pricing';
import StepSection from '@/components/custom/StepSection';
import Testimonial from '@/components/custom/Testimonial';

export default function HomeIndex() {
    return (
        <div className="relative h-screen w-screen overflow-x-hidden bg-[#f9fdfa]">
            <MainMenu />
            <BubbleBackground>
                <Hero />
            </BubbleBackground>
            <Features />
            <StepSection />
            <Testimonial />
            <Pricing />
            <FinalCTA />
            <Footer />
        </div>
    );
}
