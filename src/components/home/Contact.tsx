// src/components/home/Contact.tsx
import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const email = "tommy_12345@live.nl";

  return (
    <section id="contact" className="py-20 relative bg-ocean overflow-hidden">
      {/* Content Layer */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-6 text-white">Get In Touch</h2>
          <p className="text-white/90 mb-8 text-lg">
            I'm currently available for freelance work and internship opportunities.
            Let's build something great together!
          </p>

          <motion.a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 bg-white text-ocean px-8 py-4 rounded-full font-bold text-lg
                     hover:bg-ocean-dark hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Email Me</span>
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {/* Moving Bubbles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-white/10 rounded-full"
          initial={{
            x: Math.random() * 100,
            y: Math.random() * 100,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            y: [-20, -40, -20],
            x: [-10, 10, -10]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </section>
  );
};

export default Contact;