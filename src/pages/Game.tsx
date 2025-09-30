import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TimelineItem {
  id: number;
  title: string;
  description: string;
  media: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  }[];
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "La Idea",
    description: "Crear un juego de boxeo VR donde el jugador se enfrenta mano a mano contra un oponente virtual hasta conseguir el knockout",
    media: [
      { type: 'image', url: 'sketch.png' },
      { type: 'image', url: 'sketch1.png' }
    ]
  },
  {
    id: 2,
    title: "Sketching",
    description: "Diseñamos la mecánica de combate: sistema de golpes, defensa, vida del oponente y animación de knockout",
    media: [
      { type: 'image', url: 'sketch3.png' },
      { type: 'image', url: 'sketch1.png' },
    ]
  },
  {
    id: 3,
    title: "Las Pruebas",
    description: "Probamos la jugabilidad del combate, balanceamos la dificultad del oponente y perfeccionamos las animaciones de knockout",
    media: [
      { type: 'image', url: 'ganar.png' },
      { type: 'image', url: 'objetivo.png' },
      { type: 'video', url: 'placeholder.svg', thumbnail: 'placeholder.svg' },
      { type: 'image', url: 'descripcion.png' },
      { type: 'image', url: 'ganar.png' },
      { type: 'video', url: 'placeholder.svg', thumbnail: 'placeholder.svg' }
    ]
  }
];

const Game = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryIndexes, setGalleryIndexes] = useState<{ [key: number]: number }>({});

  // Deshabilitar scroll al montar el componente
  useEffect(() => {
    // Deshabilitar scroll del body
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    return () => {
      // Restaurar scroll al desmontar
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  // Cerrar modal con tecla ESC
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        closeImageModal();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage]);

  // Funciones para navegación de galería
  const getVisibleMedia = (timelineIndex: number, media: any[]) => {
    const currentIndex = galleryIndexes[timelineIndex] || 0;
    return media.slice(currentIndex, currentIndex + 2);
  };

  const navigateGallery = (timelineIndex: number, direction: 'prev' | 'next', mediaLength: number) => {
    setGalleryIndexes(prev => {
      const currentIndex = prev[timelineIndex] || 0;
      let newIndex;
      
      if (direction === 'next') {
        newIndex = currentIndex + 2 >= mediaLength ? 0 : currentIndex + 2;
      } else {
        newIndex = currentIndex === 0 ? Math.max(0, mediaLength - 2) : currentIndex - 2;
      }
      
      return { ...prev, [timelineIndex]: newIndex };
    });
  };

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
  <div className="h-screen bg-background relative overflow-hidden">
    {/* Navegación lateral persistente */}
    <nav className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50 bg-[#0B0F1A]/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-[#3A86FF]/30 p-4">
      <div className="flex flex-col gap-4">
        <button
          onClick={() => setActiveSection('hero')}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
            activeSection === 'hero' 
              ? 'bg-gradient-to-r from-[#E63946] to-[#FF4D8B] text-white shadow-lg shadow-[#E63946]/50' 
              : 'bg-[#0B0F1A] border border-[#3A86FF]/20 text-[#B0B3C5] hover:bg-[#3A86FF]/20 hover:text-[#3A86FF]'
          }`}
          title="Inicio"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
          </svg>
        </button>
        <button
          onClick={() => setActiveSection('descripcion')}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
            activeSection === 'descripcion' 
              ? 'bg-gradient-to-r from-[#E63946] to-[#FF4D8B] text-white shadow-lg shadow-[#E63946]/50' 
              : 'bg-[#0B0F1A] border border-[#3A86FF]/20 text-[#B0B3C5] hover:bg-[#3A86FF]/20 hover:text-[#3A86FF]'
          }`}
          title="Descripción"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
          </svg>
        </button>
        <button
          onClick={() => setActiveSection('proceso')}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
            activeSection === 'proceso' 
              ? 'bg-gradient-to-r from-[#E63946] to-[#FF4D8B] text-white shadow-lg shadow-[#E63946]/50' 
              : 'bg-[#0B0F1A] border border-[#3A86FF]/20 text-[#B0B3C5] hover:bg-[#3A86FF]/20 hover:text-[#3A86FF]'
          }`}
          title="Proceso"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
          </svg>
        </button>
        <button
          onClick={() => setActiveSection('equipo')}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
            activeSection === 'equipo' 
              ? 'bg-gradient-to-r from-[#E63946] to-[#FF4D8B] text-white shadow-lg shadow-[#E63946]/50' 
              : 'bg-[#0B0F1A] border border-[#3A86FF]/20 text-[#B0B3C5] hover:bg-[#3A86FF]/20 hover:text-[#3A86FF]'
          }`}
          title="Equipo"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
          </svg>
        </button>
      </div>
    </nav>
      {/* Header profesional con colores de empresa */}
      <header className="fixed top-0 w-full bg-[#0B0F1A]/95 backdrop-blur-sm shadow-lg z-30 border-b border-[#3A86FF]/30">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#E63946] to-[#FF4D8B] rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">VK</span>
              </div>
              <h1 className="text-xl font-bold text-white">
                VIRTUAL KNOCKOUT
              </h1>
            </Link>
            <div className="flex items-center gap-6">
              <Link 
                to="/" 
                className="text-[#B0B3C5] hover:text-[#3A86FF] transition-colors font-medium"
              >
                Inicio
              </Link>
              <span className="px-4 py-2 bg-gradient-to-r from-[#E63946] to-[#FF4D8B] text-white rounded-lg font-medium shadow-lg">
                Juego
              </span>
              <span className="text-[#B0B3C5] hover:text-[#3A86FF] transition-colors font-medium">
                Proyecto
              </span>
            </div>
          </nav>
        </div>
      </header>


      {/* Hero Section - Fullscreen */}
      {activeSection === 'hero' && (
        <section className="section-fullscreen flex items-center justify-center relative overflow-hidden">
          {/* GIF de fondo en bucle */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url('${import.meta.env.BASE_URL}BOXER.gif')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
        <div className="container mx-auto px-4 text-center relative z-10 pt-20">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            VIRTUAL KNOCKOUT
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experiencia inmersiva de boxeo en realidad virtual que combina tecnología avanzada con entrenamiento deportivo
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => setActiveSection('descripcion')}
              className="px-10 py-4 bg-gradient-to-r from-[#E63946] to-[#FF4D8B] hover:from-[#E63946]/90 hover:to-[#FF4D8B]/90 text-white rounded-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl shadow-[#E63946]/50 text-lg"
            >
              Explorar el Juego VR
            </button>
          </div>
        </div>
        
        {/* Capa oscura para mejor contraste */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        
        {/* Indicador de navegación */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <p className="text-[#B0B3C5] text-sm text-center bg-[#0B0F1A]/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#3A86FF]/30">
            Usa la navegación lateral para explorar
          </p>
        </div>
      </section>
      )}

      {/* Game Description Section - Fullscreen */}
      {activeSection === 'descripcion' && (
        <section className="section-fullscreen bg-gradient-to-br from-[#050812] to-[#0A0F1A]">
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-4xl font-bold text-center mb-8 text-white">
              Virtual Knockout
            </h2>
            <div className="flex flex-col gap-16">
          {/* Fila 1: ¿En qué consiste? (texto izquierda, imagen derecha) */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 order-2 md:order-1 ">
                <div className="bg-gradient-to-r from-[#0B0F1A] to-[#0B0F1A]/80 rounded-xl p-6 shadow-lg mb-2 border border-[#3A86FF]/30 backdrop-blur-sm">
                <h4 className="text-2xl font-bold text-[#E63946] mb-2">¿En qué consiste?</h4>
                <p className="text-base text-white">Virtual Knockout es un juego de boxeo en realidad virtual donde te enfrentas cara a cara contra un peleador virtual hasta conseguir el knockout definitivo. ¡Solo uno puede quedar en pie!</p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center order-1 md:order-2">
              <img src={`${import.meta.env.BASE_URL}descripcion1.png`} alt="Gameplay Virtual Knockout" className="w-full max-w-lg h-auto rounded-2xl border border-blue-200 shadow-lg" />
            </div>
          </div>

          {/* Fila 2: Objetivo (imagen izquierda, texto derecha) */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 flex justify-center mb-4 md:mb-0">
              <img
                src={`${import.meta.env.BASE_URL}objetivo1.png`}
                alt="Objetivo Virtual Knockout"
                className="w-full max-w-lg h-auto rounded-2xl border border-blue-200 shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <div className="bg-gradient-to-r from-[#0B0F1A] to-[#0B0F1A]/80 rounded-xl p-6 shadow-lg border border-[#3A86FF]/30 backdrop-blur-sm">
                <h5 className="text-xl font-semibold text-[#E63946] mb-2">Objetivo</h5>
                <p className="text-base text-white">Derrota a tu oponente usando combinaciones de golpes, movimientos defensivos y estrategia de combate. Tu misión es simple: <span className='font-bold text-[#FFD700]'>¡Knockearlo antes de que él te knockee a ti!</span></p>
              </div>
            </div>
          </div>

          {/* Fila 3: ¿Listo para la acción? (texto izquierda, imagen derecha) */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 order-2 md:order-1">
              <p className="text-2xl text-white font-semibold mb-6">¿Listo para sudar, esquivar y golpear como un campeón?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-8">
                <div className="bg-gradient-to-br from-[#050812] to-[#0A0F1A] rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-[#3A86FF]/30">
                  <span className="text-4xl mb-2 text-[#3A86FF]">⚡</span>
                  <span className="font-bold text-lg text-[#E63946]">Combate Rápido</span>
                  <span className="text-white/80 text-sm mt-1">Esquiva, bloquea y contraataca en tiempo real contra tu oponente.</span>
                </div>
                <div className="bg-gradient-to-br from-[#050812] to-[#0A0F1A] rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-[#E63946]/30">
                  <span className="text-4xl mb-2 text-[#E63946]">💥</span>
                  <span className="font-bold text-lg text-[#E63946]">Knockout Épico</span>
                  <span className="text-white/80 text-sm mt-1">Cada golpe cuenta. Busca la oportunidad perfecta para el KO final.</span>
                </div>
                <div className="bg-gradient-to-br from-[#050812] to-[#0A0F1A] rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-[#FF4D8B]/30">
                  <span className="text-4xl mb-2 text-[#FF4D8B]">🥊</span>
                  <span className="font-bold text-lg text-white">Técnicas de Boxeo</span>
                  <span className="text-white/80 text-sm mt-1">Jabs, ganchos y uppercuts. Domina el arte del boxeo virtual.</span>
                </div>
                <div className="bg-gradient-to-br from-[#050812] to-[#0A0F1A] rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-[#FFD700]/30">
                  <span className="text-4xl mb-2 text-[#FFD700]">🏆</span>
                  <span className="font-bold text-lg text-[#FFD700]">Campeón Invicto</span>
                  <span className="text-white/80 text-sm mt-1">Defiende tu récord y mantente como el último en pie del ring.</span>
                </div>
              </div>
              <button className="mt-2 inline-block px-8 py-4 bg-gradient-to-r from-[#E63946] to-[#FF4D8B] hover:from-[#E63946]/90 hover:to-[#FF4D8B]/90 text-white text-xl font-bold rounded-lg shadow-lg shadow-[#E63946]/50 transition-all duration-300">¡Pruébalo ahora!</button>
            </div>
            <div className="md:w-1/2 flex justify-center order-1 md:order-2">
              <img src={`${import.meta.env.BASE_URL}cinturon.png`} alt="Acción Virtual Knockout" className="w-full max-w-lg h-auto rounded-2xl border border-blue-200 shadow-lg" />
            </div>
          </div>
            </div>
          </div>
        </section>
      )}

      {/* Timeline Section - Fullscreen */}
      {activeSection === 'proceso' && (
        <section className="section-fullscreen bg-gradient-to-br from-[#050812] via-[#0A0F1A] to-[#0D1420]">
          <div className="container mx-auto px-4 py-8">
            <h3 className="text-4xl font-bold text-center mb-4 text-white">
              Proceso de Desarrollo
            </h3>
            <p className="text-center text-white/80 mb-12 text-lg max-w-2xl mx-auto">
              Metodología aplicada desde la conceptualización hasta la implementación final
            </p>
    
    {/* Timeline con Gallery - Opción C */}
    <div className="relative max-w-7xl mx-auto">
      {/* Timeline Line mejorada */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#E63946] via-[#FF4D8B] to-[#3A86FF] rounded-full shadow-lg"></div>
      
      {/* Timeline Items */}
      <div className="space-y-20">
        {timelineData.map((item, index) => (
          <div key={item.id} className="relative flex items-center">
            {/* Card de contenido (lado izquierdo) */}
            <div className="w-5/12 pr-8">
              <Card 
                className="transition-all duration-500 hover:shadow-2xl hover:shadow-[#E63946]/30 border-2 border-[#3A86FF]/30 hover:border-[#E63946] bg-gradient-to-r from-[#0B0F1A] to-[#0B0F1A]/80 backdrop-blur-sm"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="w-10 h-10 bg-gradient-to-r from-[#E63946] to-[#FF4D8B] text-white rounded-lg flex items-center justify-center text-lg font-bold shadow-lg">
                      {index + 1}
                    </span>
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#B0B3C5] leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Timeline line mejorada con animación */}
            <div className="flex flex-col items-center relative">
              {index > 0 && (
                <div className="w-1 h-16 bg-gradient-to-b from-[#E63946] to-[#FF4D8B] rounded-full mb-2 shadow-sm"></div>
              )}
              <div className="w-6 h-6 bg-gradient-to-br from-[#E63946] to-[#FF4D8B] rounded-full border-4 border-[#0B0F1A] shadow-lg z-10 pulse-animation">
                <div className="w-full h-full bg-[#0B0F1A] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
                </div>
              </div>
              {index < timelineData.length - 1 && (
                <div className="w-1 h-16 bg-gradient-to-b from-[#FF4D8B] to-[#3A86FF] rounded-full mt-2 shadow-sm"></div>
              )}
            </div>
            
            {/* Gallery de medios (lado derecho) */}
            <div className="w-5/12 pl-8">
              <div className="bg-gradient-to-br from-[#050812] to-[#0A0F1A] border border-[#E63946]/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-[#E63946] flex items-center gap-2">
                    <span>📸</span> Gallery - {item.title}
                  </h4>
                  <div className="text-xs text-white/60">
                    {item.media.length} archivo{item.media.length > 1 ? 's' : ''}
                  </div>
                </div>
                
                {/* Grid de imágenes/videos con navegación */}
                <div className="relative">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {getVisibleMedia(index, item.media).map((media, mediaIndex) => (
                      <div 
                        key={mediaIndex}
                        className="aspect-video bg-gradient-to-br from-[#0A0F1A] to-[#050812] rounded-lg border border-[#3A86FF]/30 overflow-hidden cursor-pointer hover:border-[#E63946] hover:shadow-lg hover:shadow-[#E63946]/30 transition-all duration-300"
                        onClick={() => media.type === 'image' && openImageModal(`${import.meta.env.BASE_URL}${media.url.replace('/', '')}`)}
                        title={media.type === 'image' ? 'Click para ver imagen completa' : 'Click para reproducir video'}
                      >
                        {media.type === 'image' ? (
                          <img 
                            src={`${import.meta.env.BASE_URL}${media.url.replace('/', '')}`}
                            alt={`${item.title} - Imagen ${mediaIndex + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
                              if (nextSibling) nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-[#3A86FF] hover:text-[#E63946] transition-colors duration-300">
                            <span className="text-3xl mb-2 hover:scale-110 transition-transform duration-300">🎬</span>
                            <span className="text-xs">Click para reproducir</span>
                          </div>
                        )}
                        {/* Fallback para imágenes que no cargan */}
                        <div className="w-full h-full hidden items-center justify-center text-[#3A86FF] bg-[#3A86FF]/10">
                          <span className="text-2xl">{media.type === 'image' ? '🖼️' : '🎬'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Controles de navegación */}
                  {item.media.length > 2 && (
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => navigateGallery(index, 'prev', item.media.length)}
                        className="w-10 h-10 bg-[#E63946]/20 hover:bg-[#E63946]/40 border border-[#E63946]/30 text-[#E63946] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 font-bold text-lg"
                        title="Anterior"
                      >
                        ←
                      </button>
                      
                      <div className="text-center">
                        <div className="flex gap-2 justify-center">
                          {Array.from({ length: Math.ceil(item.media.length / 2) }).map((_, dotIndex) => (
                            <div
                              key={dotIndex}
                              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                Math.floor((galleryIndexes[index] || 0) / 2) === dotIndex
                                  ? 'bg-[#E63946]'
                                  : 'bg-white/30'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-xs text-white/50 mt-1">
                          Página {Math.floor((galleryIndexes[index] || 0) / 2) + 1} de {Math.ceil(item.media.length / 2)}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => navigateGallery(index, 'next', item.media.length)}
                        className="w-10 h-10 bg-[#E63946]/20 hover:bg-[#E63946]/40 border border-[#E63946]/30 text-[#E63946] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 font-bold text-lg"
                        title="Siguiente"
                      >
                        →
                      </button>
                    </div>
                  )}
                  
                  {/* Información adicional */}
                  <div className="text-center mt-4">
                    <p className="text-white/70 text-xs">
                      {item.media.length > 2 
                        ? `Mostrando ${Math.min(2, item.media.length - (galleryIndexes[index] || 0))} de ${item.media.length} elementos`
                        : `${item.media.length} elemento${item.media.length > 1 ? 's' : ''} disponible${item.media.length > 1 ? 's' : ''}`
                      }
                    </p>
                  </div>
                </div>
              </div>


            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
)}




      {/* Sección Final - Fullscreen */}
      {activeSection === 'equipo' && (
        <section className="section-fullscreen bg-gradient-to-br from-[#050812] to-[#0A0F1A]">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-6 text-white">
            Tecnología y Equipo
          </h3>
          <p className="text-center text-white/80 mb-12 text-lg max-w-2xl mx-auto">
            Stack tecnológico y metodología de desarrollo utilizada para crear esta experiencia inmersiva
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border border-[#3A86FF]/30 bg-[#050812]">
              <CardHeader>
                <CardTitle className="text-2xl text-white">
                  Stack Tecnológico
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="p-4 border border-[#3A86FF]/30 rounded-lg">
                    <div className="font-semibold text-white text-lg">Unity 2022.3 LTS</div>
                    <div className="text-white/70">Motor de desarrollo para experiencias VR</div>
                    <div className="text-sm text-[#3A86FF] mt-1 font-medium">Engine Principal</div>
                  </div>
                  <div className="p-4 border border-[#E63946]/30 rounded-lg">
                    <div className="font-semibold text-white text-lg">Meta Quest 2</div>
                    <div className="text-white/70">Hardware de realidad virtual de última generación</div>
                    <div className="text-sm text-[#E63946] mt-1 font-medium">Plataforma de Destino</div>
                  </div>
                  <div className="p-4 border border-[#FF4D8B]/30 rounded-lg">
                    <div className="font-semibold text-white text-lg">Blender 4.0</div>
                    <div className="text-white/70">Herramienta de modelado 3D y animación</div>
                    <div className="text-sm text-[#FF4D8B] mt-1 font-medium">Asset Creation</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-[#E63946]/30 bg-[#050812]">
              <CardHeader>
                <CardTitle className="text-2xl text-white">
                  Metodología de Desarrollo
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="p-4 border border-[#E63946]/30 rounded-lg">
                    <div className="font-bold text-lg text-white mb-3">Desarrollo Ágil</div>
                    <div className="text-white/80 mb-4">
                      Implementación iterativa con metodologías centradas en el usuario, aplicando principios de diseño de Interacción Humano-Computadora
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-[#3A86FF]/20 border border-[#3A86FF]/30 text-[#3A86FF] rounded-full text-sm font-medium">
                        User Testing
                      </span>
                      <span className="px-3 py-1 bg-[#FF4D8B]/20 border border-[#FF4D8B]/30 text-[#FF4D8B] rounded-full text-sm font-medium">
                        Prototipado Rápido
                      </span>
                      <span className="px-3 py-1 bg-[#FFD700]/20 border border-[#FFD700]/30 text-[#FFD700] rounded-full text-sm font-medium">
                        Iteración Continua
                      </span>
                    </div>
                    <div className="text-center pt-3 border-t border-[#3A86FF]/20">
                      <div className="text-sm text-white/70">
                        Proyecto Académico - Interacción Humano-Computadora
                      </div>
                      <div className="text-sm text-[#FFD700] font-medium mt-1">
                        Universidad • Semestre 2025-B
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>
      )}
      
      {/* Footer profesional que ocupa todo el final */}
      <footer className="w-full bg-gradient-to-b from-[#060A12] to-[#030507] border-t border-[#E63946]/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-[#E63946] to-[#FF4D8B] rounded-xl flex items-center justify-center shadow-xl shadow-[#E63946]/30">
              <span className="text-white font-bold text-lg">VK</span>
            </div>
            <span className="text-white font-bold text-2xl tracking-wide">VIRTUAL KNOCKOUT</span>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-[#E63946] to-[#FF4D8B] mx-auto mb-6 rounded-full"></div>
          <p className="text-white/90 text-xl mb-4 font-medium">
            © 2025 - Proyecto Académico de Interacción Humano-Computadora
          </p>
          <p className="text-white/70 text-lg">
            Desarrollado aplicando principios de UX/UI y diseño centrado en el usuario
          </p>
        </div>
      </footer>

      {/* Modal para ver imagen expandida */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
          onClick={closeImageModal}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img 
              src={selectedImage}
              alt="Imagen expandida"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 w-12 h-12 bg-black/70 hover:bg-black/90 border border-white/20 text-white rounded-lg flex items-center justify-center text-xl font-bold transition-all duration-300 hover:scale-110"
              title="Cerrar imagen"
            >
              ✕
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm">
              Click fuera de la imagen o presiona ESC para cerrar
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Game;