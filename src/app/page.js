// Server Component
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="font-sans">
      <Header />
      <Hero />
      <Features />
      <TestimonialsSlider />
      <Footer />
    </div>
  );
}
