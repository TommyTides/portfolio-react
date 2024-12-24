import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase.ts';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageId: string;
  githubUrl: string;
  demoUrl: string;
}

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const getGoogleDriveImageUrl = (fileId: string) => {
    return `https://drive.google.com/thumbnail?id=${fileId}`;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
    >
      <motion.div 
        className="bg-white rounded-lg shadow-lg overflow-hidden transform-gpu"
        whileHover={{ 
          scale: 1.02,
          rotateY: 5,
          translateZ: 20,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        style={{ 
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
      >
        {project.imageId && (
          <div className="relative overflow-hidden h-48">
            <motion.img
              src={getGoogleDriveImageUrl(project.imageId)}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}
        
        <div className="p-6">
          <motion.h3 
            className="text-xl font-bold mb-2 text-ocean-dark"
            style={{ transform: "translateZ(20px)" }}
          >
            {project.title}
          </motion.h3>
          
          <motion.p 
            className="text-gray-600 mb-4"
            style={{ transform: "translateZ(10px)" }}
          >
            {project.description}
          </motion.p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, index) => (
              <motion.span
                key={index}
                className="bg-ocean/10 text-ocean-dark px-3 py-1 rounded-full text-sm"
                whileHover={{ scale: 1.1 }}
                style={{ transform: "translateZ(30px)" }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
          
          <div className="flex gap-4">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ocean hover:text-ocean-dark transition-colors"
                whileHover={{ scale: 1.1 }}
                style={{ transform: "translateZ(40px)" }}
              >
                GitHub
              </motion.a>
            )}
            {project.demoUrl && (
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ocean hover:text-ocean-dark transition-colors"
                whileHover={{ scale: 1.1 }}
                style={{ transform: "translateZ(40px)" }}
              >
                Live Demo
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const snapshot = await getDocs(collection(db, 'projects'));
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project)));
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 bg-ocean/5">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold mb-8 text-ocean-dark text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;