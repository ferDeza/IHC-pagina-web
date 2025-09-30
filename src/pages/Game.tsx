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
    youtubeId?: string; // ID del video de YouTube
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
      { type: 'video', url: 'https://www.youtube.com/watch?v=QMEVDcjxyuA', youtubeId: 'QMEVDcjxyuA' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=FZopgnWH78I', youtubeId: 'FZopgnWH78I' }
    ]
  }
];

const Game = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
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
      if (e.key === 'Escape') {
        if (selectedImage) closeImageModal();
        if (selectedVideo) closeVideoModal();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, selectedVideo]);

  // Funciones para navegación de galería
  const getVisibleMedia = (timelineIndex: number, media: TimelineItem['media']) => {
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

  const openVideoModal = (youtubeId: string) => {
    setSelectedVideo(youtubeId);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  // Función para obtener el thumbnail automático de YouTube
  const getYouTubeThumbnail = (youtubeId: string, quality: 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault' = 'hqdefault') => {
    return `https://img.youtube.com/vi/${youtubeId}/${quality}.jpg`;
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
                        onClick={() => {
                          if (media.type === 'image') {
                            openImageModal(`${import.meta.env.BASE_URL}${media.url.replace('/', '')}`);
                          } else if (media.type === 'video' && media.youtubeId) {
                            openVideoModal(media.youtubeId);
                          }
                        }}
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
                          <div 
                            className="w-full h-full flex flex-col items-center justify-center text-[#3A86FF] hover:text-[#E63946] transition-colors duration-300 relative group"
                            style={{
                              backgroundImage: media.youtubeId 
                                ? `url('${getYouTubeThumbnail(media.youtubeId, 'hqdefault')}')`
                                : media.thumbnail 
                                  ? `url('${import.meta.env.BASE_URL}${media.thumbnail}')`
                                  : 'linear-gradient(45deg, #0A0F1A, #050812)',
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            }}
                          >
                            {/* Overlay con botón de play estilo YouTube */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center transition-all duration-300">
                              {/* Botón de play simple estilo YouTube */}
                              <div className="relative group-hover:scale-110 transition-transform duration-300">
                                {/* Círculo de fondo semi-transparente */}
                                <div className="w-20 h-20 bg-black/60 group-hover:bg-red-600/90 rounded-full flex items-center justify-center transition-colors duration-300 shadow-2xl">
                                  {/* Triángulo de play */}
                                  <div className="w-0 h-0 border-l-[14px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Indicador de duración (opcional - estilo YouTube) */}
                            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                              Video
                            </div>
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




      {/* Sección de Equipo - Fullscreen */}
      {activeSection === 'equipo' && (
        <section className="section-fullscreen bg-gradient-to-br from-[#050812] to-[#0A0F1A] flex flex-col">
          <div className="container mx-auto px-4 py-8 flex-1 flex flex-col justify-center">
            {/* Header de la sección */}
            <div className="text-center mb-16">
              <h3 className="text-5xl font-bold mb-6 text-white">
                Nuestro Equipo
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-[#E63946] to-[#FF4D8B] mx-auto mb-6 rounded-full"></div>
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                Estudiantes de Ciencia de la Computación apasionados por la innovación tecnológica y el diseño de experiencias inmersivas
              </p>
            </div>

            {/* Grid de miembros del equipo */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
              {/* Miembro 1 */}
              <div className="relative bg-gradient-to-br from-[#0B0F1A] to-[#050812] rounded-2xl border border-[#3A86FF]/30 p-6 shadow-lg">
                {/* Avatar con imagen real */}
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full border-4 border-[#E63946]/50 shadow-lg">
                  <img 
                    src={`${import.meta.env.BASE_URL}descripcion1.png`}
                    alt="Foto del desarrollador principal"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback si la imagen no carga
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-[#E63946] to-[#FF4D8B] flex items-center justify-center text-white text-xl font-bold">D</div>';
                      }
                    }}
                  />
                </div>
                
                {/* Información del miembro */}
                <div className="text-center">
                  <h4 className="text-xl font-bold text-white mb-2">
                    Erik Ramos
                  </h4>
                  <p className="text-[#3A86FF] font-medium mb-3 text-sm">
                    Desarrollador Principal
                  </p>
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">
                    Especializado en Unity y desarrollo VR. Lideró la implementación del sistema de combate y mecánicas de juego.
                  </p>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 justify-center">
                    <span className="px-2 py-1 bg-[#3A86FF]/20 text-[#3A86FF] text-xs rounded-full border border-[#3A86FF]/30">Unity</span>
                    <span className="px-2 py-1 bg-[#E63946]/20 text-[#E63946] text-xs rounded-full border border-[#E63946]/30">VR Dev</span>
                    <span className="px-2 py-1 bg-[#FF4D8B]/20 text-[#FF4D8B] text-xs rounded-full border border-[#FF4D8B]/30">C#</span>
                  </div>
                </div>
              </div>

              {/* Miembro 2 */}
              <div className="relative bg-gradient-to-br from-[#0B0F1A] to-[#050812] rounded-2xl border border-[#E63946]/30 p-6 shadow-lg">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full border-4 border-[#3A86FF]/50 shadow-lg">
                  <img 
                    src={`${import.meta.env.BASE_URL}objetivo1.png`}
                    alt="Foto del diseñador UX/UI"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-[#3A86FF] to-[#4F94FF] flex items-center justify-center text-white text-xl font-bold">UX</div>';
                      }
                    }}
                  />
                </div>
                
                <div className="text-center">
                  <h4 className="text-xl font-bold text-white mb-2">
                    Lizardo Castillo
                  </h4>
                  <p className="text-[#E63946] font-medium mb-3 text-sm">
                    Diseñador UX/UI
                  </p>
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">
                    Experto en IHC y diseño de interfaces. Responsable de la experiencia de usuario y el diseño visual del proyecto.
                  </p>
                  
                  <div className="flex flex-wrap gap-1 justify-center">
                    <span className="px-2 py-1 bg-[#E63946]/20 text-[#E63946] text-xs rounded-full border border-[#E63946]/30">UX/UI</span>
                    <span className="px-2 py-1 bg-[#3A86FF]/20 text-[#3A86FF] text-xs rounded-full border border-[#3A86FF]/30">IHC</span>
                    <span className="px-2 py-1 bg-[#FFD700]/20 text-[#FFD700] text-xs rounded-full border border-[#FFD700]/30">Figma</span>
                  </div>
                </div>
              </div>

              {/* Miembro 3 */}
              <div className="relative bg-gradient-to-br from-[#0B0F1A] to-[#050812] rounded-2xl border border-[#FF4D8B]/30 p-6 shadow-lg">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full border-4 border-[#FF4D8B]/50 shadow-lg">
                  <img 
                    src={`${import.meta.env.BASE_URL}cinturon.png`}
                    alt="Foto del artista 3D"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-[#FF4D8B] to-[#FFD700] flex items-center justify-center text-white text-xl font-bold">3D</div>';
                      }
                    }}
                  />
                </div>
                
                <div className="text-center">
                  <h4 className="text-xl font-bold text-white mb-2">
                    Karla Cornejo
                  </h4>
                  <p className="text-[#FFD700] font-medium mb-3 text-sm">
                    Artista 3D
                  </p>
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">
                    Modelado 3D y animaciones. Creó todos los assets visuales, personajes y entornos del juego VR.
                  </p>
                  
                  <div className="flex flex-wrap gap-1 justify-center">
                    <span className="px-2 py-1 bg-[#FF4D8B]/20 text-[#FF4D8B] text-xs rounded-full border border-[#FF4D8B]/30">Blender</span>
                    <span className="px-2 py-1 bg-[#FFD700]/20 text-[#FFD700] text-xs rounded-full border border-[#FFD700]/30">3D Art</span>
                    <span className="px-2 py-1 bg-[#3A86FF]/20 text-[#3A86FF] text-xs rounded-full border border-[#3A86FF]/30">Animación</span>
                  </div>
                </div>
              </div>

              {/* Miembro 4 */}
              <div className="relative bg-gradient-to-br from-[#0B0F1A] to-[#050812] rounded-2xl border border-[#FFD700]/30 p-6 shadow-lg">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full border-4 border-[#FFD700]/50 shadow-lg">
                  <img 
                    src={`${import.meta.env.BASE_URL}ganar.png`}
                    alt="Foto del ingeniero de software"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-[#FFD700] to-[#E63946] flex items-center justify-center text-white text-xl font-bold">SW</div>';
                      }
                    }}
                  />
                </div>
                
                <div className="text-center">
                  <h4 className="text-xl font-bold text-white mb-2">
                    Fernando Deza
                  </h4>
                  <p className="text-[#FF4D8B] font-medium mb-3 text-sm">
                    Ingeniero de Software
                  </p>
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">
                    Optimización y arquitectura del código. Encargado del testing, debugging y rendimiento del juego.
                  </p>
                  
                  <div className="flex flex-wrap gap-1 justify-center">
                    <span className="px-2 py-1 bg-[#FFD700]/20 text-[#FFD700] text-xs rounded-full border border-[#FFD700]/30">Testing</span>
                    <span className="px-2 py-1 bg-[#E63946]/20 text-[#E63946] text-xs rounded-full border border-[#E63946]/30">Debug</span>
                    <span className="px-2 py-1 bg-[#3A86FF]/20 text-[#3A86FF] text-xs rounded-full border border-[#3A86FF]/30">Git</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Información del proyecto académico */}
            <div className="max-w-4xl mx-auto text-center">
              <Card className="border border-[#3A86FF]/30 bg-gradient-to-r from-[#0B0F1A]/80 to-[#050812]/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#E63946] to-[#FF4D8B] rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">🎓</span>
                    </div>
                    <h4 className="text-2xl font-bold text-white">Proyecto Académico</h4>
                  </div>
                  
                  <p className="text-white/80 text-lg leading-relaxed mb-6">
                    Este proyecto fue desarrollado como parte del curso de <span className="text-[#3A86FF] font-semibold">Interacción Humano-Computadora</span>, 
                    aplicando metodologías de diseño centrado en el usuario y principios de usabilidad en el desarrollo de experiencias inmersivas.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-4">
                      <div className="text-2xl font-bold text-[#E63946] mb-1">2025-B</div>
                      <div className="text-white/70 text-sm">Semestre</div>
                    </div>
                    <div className="p-4">
                      <div className="text-2xl font-bold text-[#3A86FF] mb-1">IHC</div>
                      <div className="text-white/70 text-sm">Curso</div>
                    </div>
                    <div className="p-4">
                      <div className="text-2xl font-bold text-[#FF4D8B] mb-1">Unity VR</div>
                      <div className="text-white/70 text-sm">Tecnología</div>
                    </div>
                    <div className="p-4">
                      <div className="text-2xl font-bold text-[#FFD700] mb-1">4</div>
                      <div className="text-white/70 text-sm">Integrantes</div>
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

      {/* Modal para reproducir video de YouTube */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
          onClick={closeVideoModal}
        >
          <div className="relative w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="Video de YouTube"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 w-12 h-12 bg-black/70 hover:bg-black/90 border border-white/20 text-white rounded-lg flex items-center justify-center text-xl font-bold transition-all duration-300 hover:scale-110 z-10"
              title="Cerrar video"
            >
              ✕
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm z-10">
              Click fuera del video o presiona ESC para cerrar
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Game;