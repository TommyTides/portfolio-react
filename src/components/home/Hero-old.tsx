import React from 'react';
import { motion } from 'framer-motion';
import Wave from 'react-wavify';

const Cloud: React.FC<{ className?: string; delay?: number }> = ({ className = '', delay = 0 }) => (
  <motion.svg
    viewBox="0 0 640 512"
    className={`absolute w-24 h-24 fill-white opacity-80 ${className}`}
    initial={{ x: -100 }}
    animate={{ x: '120vw' }}
    transition={{
      duration: 25,
      repeat: Infinity,
      delay,
      ease: "linear"
    }}
  >
    <path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4z"/>
  </motion.svg>
);

const Hero: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center" 
         style={{ background: 'linear-gradient(180deg, #87CEEB 0%, #1E90FF 100%)' }}>
      
      {/* Sun */}
      <motion.div 
        className="absolute top-20 right-20 w-24 h-24 rounded-full bg-yellow-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ 
          boxShadow: '0 0 60px #FDB813, 0 0 100px #FDB813'
        }}
      />

      {/* Clouds */}
      <Cloud className="top-12" delay={0} />
      <Cloud className="top-28" delay={4} />
      <Cloud className="top-20" delay={8} />
      <Cloud className="top-36" delay={12} />
      <Cloud className="top-16" delay={16} />

      {/* Content */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 relative z-10 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hi, I'm <span className="text-white">Your Name</span>
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Full Stack Developer
        </motion.p>
        <motion.button 
          className="bg-white text-ocean hover:bg-ocean hover:text-white font-bold py-3 px-8 rounded-full transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View My Work
        </motion.button>
      </motion.div>

      {/* Waves */}
      <div className="absolute bottom-0 w-full">
        {/* First Wave */}
        <Wave
          fill="rgba(30, 144, 255, 0.3)"
          paused={false}
          options={{
            height: 20,
            amplitude: 20,
            speed: 0.15,
            points: 3
          }}
          className="absolute bottom-16"
        />
        
        {/* Second Wave */}
        <Wave
          fill="rgba(0, 119, 190, 0.5)"
          paused={false}
          options={{
            height: 20,
            amplitude: 25,
            speed: 0.2,
            points: 4
          }}
          className="absolute bottom-8"
        />
        
        {/* Third Wave */}
        <Wave
          fill="rgba(0, 87, 145, 0.8)"
          paused={false}
          options={{
            height: 20,
            amplitude: 30,
            speed: 0.25,
            points: 5
          }}
          className="absolute bottom-0"
        />
      </div>
    </div>
  );
};

export default Hero;