import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

interface HeaderProps {
  rightElement?: React.ReactNode;
  customLogo?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ rightElement, customLogo }) => {
  return (
    <header className="fixed top-0 w-full bg-[#0B0F1A]/95 backdrop-blur-sm shadow-lg z-30 border-b border-[#3A86FF]/30">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center w-full">
          
          {/* Columna izquierda: Logo con posición fija */}
          <div className="w-80 flex items-center" style={{ paddingLeft: '24px' }}>
            {customLogo || (
              <Link to="/" className="flex items-center gap-4 group">
                <img 
                  src={`${import.meta.env.BASE_URL}nextZone.png`} 
                  alt="Logo" 
                  className="h-12 w-auto group-hover:scale-105 transition-transform drop-shadow-lg"
                />
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-[#E63946] to-[#FF4D8B] bg-clip-text text-transparent">
                    NEXTZONE
                  </h1>
                  <p className="text-xs text-gray-500">VR Studio</p>
                </div>
              </Link>
            )}
          </div>

          {/* Columna central: Navegación centrada */}
          <div className="flex-1 flex justify-center">
            <Navigation />
          </div>
          
          {/* Columna derecha: Elemento adicional con ancho fijo */}
          <div className="w-80 flex justify-end">
            {rightElement}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;