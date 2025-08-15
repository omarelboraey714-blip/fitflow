// Server Component
import Header from "@/components/Header";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="font-sans">
      <Hero />
      <Features />
      <TestimonialsSlider />
    </div>
  );
}
