"use client";

import { motion } from "framer-motion";

export default function GoogleMap() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
      className="rounded-2xl overflow-hidden shadow-2xl"
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.868751970825!2d31.23571261512451!3d30.04441968187949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458474c3d6c3d6d%3A0x123456789abcdef!2sGym%20Location!5e0!3m2!1sen!2seg!4v1234567890123"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="موقع الجيم"
      ></iframe>
    </motion.div>
  );
}
