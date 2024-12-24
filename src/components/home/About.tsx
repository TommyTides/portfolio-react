// src/components/home/About.tsx
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase.ts';
import Tilt from 'react-parallax-tilt';

interface AboutData {
  bio: string;
  email: string;
  location: string;
  linkedin: string;
  github: string;
}

const About: React.FC = () => {
  const [aboutData, setAboutData] = React.useState<AboutData | null>(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  React.useEffect(() => {
    const fetchAboutData = async () => {
      const docRef = await getDocs(collection(db, 'about'));
      if (!docRef.empty) {
        setAboutData(docRef.docs[0].data() as AboutData);
      }
    };
    fetchAboutData();
  }, []);

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Wave Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="text-ocean">
          <pattern id="wave-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path 
              d="M0 20 Q20 40 40 20 T80 20" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path 
              d="M0 40 Q20 60 40 40 T80 40" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path 
              d="M0 60 Q20 80 40 60 T80 60" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#wave-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-4xl font-bold mb-12 text-ocean-dark text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Tilt
              className="parallax-effect"
              perspective={1000}
              scale={1.05}
            >
              <motion.div
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={cardVariants}
                className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg relative overflow-hidden"
              >
                <div className="relative z-10">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {aboutData?.bio || 'Loading...'}
                  </p>
                  
                  <div className="space-y-3">
                    <motion.div 
                      className="flex items-center gap-3"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-ocean">📍</span>
                      <span>{aboutData?.location}</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-3"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-ocean">📧</span>
                      <span>{aboutData?.email}</span>
                    </motion.div>
                  </div>
                </div>
                
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-ocean/10 rounded-full" />
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-ocean/5 rounded-full" />
              </motion.div>
            </Tilt>
          </div>

          <motion.div 
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.a
              href={aboutData?.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-bold text-ocean-dark mb-2">GitHub</h3>
              <p className="text-gray-600">Check out my code</p>
            </motion.a>

            <motion.a
              href={aboutData?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-bold text-ocean-dark mb-2">LinkedIn</h3>
              <p className="text-gray-600">Connect with me</p>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;