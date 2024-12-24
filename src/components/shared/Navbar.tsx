// src/components/shared/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { CSSTransition } from 'react-transition-group';

// Add this CSS to your index.css or create a new styles/MobileMenu.css
const mobileMenuStyles = `
.mobile-menu-enter {
  opacity: 0;
  transform: scale(0.95);
}

.mobile-menu-enter-active {
  opacity: 1;
  transform: scale(1);
  transition: opacity 300ms ease-in, transform 300ms ease-in;
}

.mobile-menu-exit {
  opacity: 1;
  transform: scale(1);
}

.mobile-menu-exit-active {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 300ms ease-out, transform 300ms ease-out;
}
`;

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ['about', 'projects', 'skills', 'contact'];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <style>{mobileMenuStyles}</style>
      <nav className="bg-ocean/80 backdrop-blur-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-white font-bold text-xl">
              Portfolio
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-white hover:text-ocean-light capitalize"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <CSSTransition
        in={isMenuOpen}
        timeout={300}
        classNames="mobile-menu"
        unmountOnExit
      >
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-ocean">
            <div className="flex flex-col items-center justify-center min-h-screen gap-8">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-white text-2xl capitalize hover:text-ocean-light transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default Navbar;