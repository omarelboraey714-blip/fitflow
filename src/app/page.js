// Server Component

import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Features />
      <TestimonialsSlider />
    </div>
  );
}
