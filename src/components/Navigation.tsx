import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  const getNavLinkClass = (path: string) => {
    // Normalizar la comparación de rutas
    const currentPath = location.pathname;
    let isActive = false;
    
    if (path === '/') {
      isActive = currentPath === '/';
    } else {
      isActive = currentPath === path;
    }
    
    return isActive
      ? "px-4 py-2 bg-rose-600 text-white rounded-lg font-medium shadow-lg transition"
      : "text-[#B0B3C5] hover:text-[#3A86FF] transition-colors font-medium";
  };

  return (
    <div className="flex items-center gap-6">
      <Link 
        to="/" 
        className={getNavLinkClass('/')}
      >
        Inicio
      </Link>
      <Link
        to="/juego"
        className={getNavLinkClass('/juego')}
      >
        Juego
      </Link>
      <Link 
        to="/proyecto"
        className={getNavLinkClass('/proyecto')}
      >
        Proyecto
      </Link>
    </div>
  );
};

export default Navigation;