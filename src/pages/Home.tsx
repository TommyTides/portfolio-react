import React from 'react';
import Navbar from '../components/shared/Navbar.tsx';
import Hero from '../components/home/Hero.tsx';
import About from '../components/home/About.tsx';
import Projects from '../components/home/Projects.tsx';
import Skills from '../components/home/Skills.tsx';
import Contact from '../components/home/Contact.tsx';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
};

export default Home;