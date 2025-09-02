"use client";

// Server Component
import ContactHeader from "@/components/Contact/ContactHeader";
import ContactInfo from "@/components/Contact/ContactInfo";
import ContactForm from "@/components/Contact/ContactForm";
import GoogleMap from "@/components/Contact/GoogleMap";
import SocialMedia from "@/components/Contact/SocialMedia";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/contact-bg.webp')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-blue-900/80"></div>

      <div className="relative z-10">
        <ContactHeader />

        <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-12">
          <ContactInfo />
          <ContactForm />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <GoogleMap />
        </div>

        <SocialMedia />
      </div>
    </div>
  );
}
