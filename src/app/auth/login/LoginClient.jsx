"use client";

import { motion } from "@/components/ui/motion";
import Branding from "@/components/auth/Branding";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginClient() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/gym-login.webp')",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-gray-900/80"></div>

      {/* Form Card */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 max-w-md w-full mx-6"
      >
        <Branding />
        <LoginForm />
      </motion.div>
    </motion.div>
  );
}
