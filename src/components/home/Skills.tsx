// src/components/home/Skills.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase.ts';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon: string;
}

// Move getLevelText outside components so it can be used by both
const getLevelText = (level: number): string => {
  switch(level) {
    case 1: return 'Beginner';
    case 2: return 'Basic';
    case 3: return 'Intermediate';
    case 4: return 'Advanced';
    case 5: return 'Expert';
    default: return 'Not Specified';
  }
};

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform transition-all"
    >
      <div className="flex items-center gap-4 mb-4">
        {skill.icon && (
          <img 
            src={skill.icon} 
            alt={skill.name}
            className="w-8 h-8"
          />
        )}
        <h3 className="text-lg font-semibold">{skill.name}</h3>
      </div>

      <div className="relative pt-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-ocean-dark">Proficiency</span>
          <motion.span 
            className="text-sm text-ocean"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {getLevelText(skill.level)}
          </motion.span>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-ocean/10">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${(skill.level / 5) * 100}%` } : { width: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-ocean"
          />
        </div>
      </div>
    </motion.div>
  );
};

const SkillBubble: React.FC<{ name: string }> = ({ name }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    className="px-4 py-2 bg-ocean/10 rounded-full cursor-pointer hover:bg-ocean hover:text-white transition-colors"
  >
    {name}
  </motion.div>
);

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchSkills = async () => {
      const snapshot = await getDocs(collection(db, 'skills'));
      setSkills(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Skill)));
    };
    fetchSkills();
  }, []);

  const categories = ['All', ...Array.from(new Set(skills.map(skill => skill.category)))];
  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold mb-12 text-center text-ocean-dark"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Skills & Expertise
        </motion.h2>

        <motion.div 
          className="flex flex-wrap gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map(category => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-ocean text-white'
                  : 'bg-white text-ocean hover:bg-ocean/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <div className="mb-12">
          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {Array.from(new Set(filteredSkills.map(skill => skill.name))).map((name) => (
              <SkillBubble key={name} name={name} />
            ))}
          </motion.div>
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;