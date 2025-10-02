import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gamepad2 } from 'lucide-react';

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
      { type: 'image', url: 'flujo-1.jpeg' },
      { type: 'image', url: 'flujo-2.jpeg' },
      { type: 'image', url: 'flujo-3.jpeg' },
      { type: 'image', url: 'flujo-4.jpeg' },
      { type: 'image', url: 'flujo-5.jpeg' },
      { type: 'image', url: 'flujo-6.1.jpeg' },
      { type: 'image', url: 'flujo-6.jpeg' },
    ]
  },
  {
    id: 3,
    title: "Protipo",
    description: "Recibimos feedback y modificamos la mecánica para mejorar la experiencia de juego",
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
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  // Estados para navegación en modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageSet, setCurrentImageSet] = useState<string[]>([]);

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

  // Cerrar modal con tecla ESC y navegar con flechas
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedImage) closeImageModal();
        if (selectedVideo) closeVideoModal();
      } else if (selectedImage && currentImageSet.length > 1) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          navigateModalImage('next');
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          navigateModalImage('prev');
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, selectedVideo, currentImageSet, currentImageIndex]);

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

  const openImageModal = (imageUrl: string, timelineIndex?: number) => {
    if (timelineIndex !== undefined) {
      // Obtener todas las imágenes de este timeline
      const allImages = timelineData[timelineIndex].media
        .filter(media => media.type === 'image')
        .map(media => `${import.meta.env.BASE_URL}${media.url.replace('/', '')}`);
      
      setCurrentImageSet(allImages);
      const currentIndex = allImages.indexOf(imageUrl);
      setCurrentImageIndex(currentIndex >= 0 ? currentIndex : 0);
    } else {
      setCurrentImageSet([imageUrl]);
      setCurrentImageIndex(0);
    }
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setCurrentImageSet([]);
    setCurrentImageIndex(0);
  };

  // Navegación dentro del modal de imagen
  const navigateModalImage = (direction: 'prev' | 'next') => {
    if (currentImageSet.length <= 1) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = currentImageIndex >= currentImageSet.length - 1 ? 0 : currentImageIndex + 1;
    } else {
      newIndex = currentImageIndex <= 0 ? currentImageSet.length - 1 : currentImageIndex - 1;
    }
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(currentImageSet[newIndex]);
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

  // Función para simular descarga
  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    
    // Simular progreso de descarga
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setDownloadProgress(i);
    }
    
    // Redirigir al repositorio de GitHub después de la "descarga"
    setTimeout(() => {
      window.open('https://github.com/ferDeza/IHC-pagina-web', '_blank');
      setIsDownloading(false);
      setDownloadProgress(0);
    }, 500);
  };

  const Sidebar = () => (
    <aside className={`fixed left-0 top-0 z-40 h-full w-20 bg-gray-900/90 backdrop-blur-sm shadow-xl shadow-black/50 flex flex-col items-center justify-center border-r border-[#3A86FF]/20`}>
      <nav className="flex flex-col space-y-6">
        {/* Botón Home */}
        <div className="relative group">
          <button
            onClick={() => setActiveSection('hero')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              activeSection === 'hero' 
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/50' 
                : 'bg-[#0B0F1A] border border-[#3A86FF]/20 text-[#B0B3C5] hover:bg-[#3A86FF]/20 hover:text-[#3A86FF]'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
          </button>
          {/* Tooltip expandible */}
          <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 bg-[#0B0F1A]/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg border border-[#3A86FF]/30 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
            Home
          </div>
        </div>

        {/* Botón Jugabilidad */}
        <div className="relative group">
          <button
            onClick={() => setActiveSection('descripcion')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              activeSection === 'descripcion' 
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/50' 
                : 'bg-[#0B0F1A] border border-[#3A86FF]/20 text-[#B0B3C5] hover:bg-[#3A86FF]/20 hover:text-[#3A86FF]'
            }`}
          >
            <Gamepad2 className="w-5 h-5" />
          </button>
          {/* Tooltip expandible */}
          <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 bg-[#0B0F1A]/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg border border-[#3A86FF]/30 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
            Jugabilidad
          </div>
        </div>

        {/* Botón Progreso */}
        <div className="relative group">
          <button
            onClick={() => setActiveSection('proceso')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              activeSection === 'proceso' 
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/50' 
                : 'bg-[#0B0F1A] border border-[#3A86FF]/20 text-[#B0B3C5] hover:bg-[#3A86FF]/20 hover:text-[#3A86FF]'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 001.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
          </button>
          {/* Tooltip expandible */}
          <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 bg-[#0B0F1A]/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg border border-[#3A86FF]/30 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
            Progreso
          </div>
        </div>

        {/* Botón Equipo */}
        <div className="relative group">
          <button
            onClick={() => setActiveSection('equipo')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              activeSection === 'equipo' 
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/50' 
                : 'bg-[#0B0F1A] border border-[#3A86FF]/20 text-[#B0B3C5] hover:bg-[#3A86FF]/20 hover:text-[#3A86FF]'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
            </svg>
          </button>
          {/* Tooltip expandible */}
          <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 bg-[#0B0F1A]/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg border border-[#3A86FF]/30 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
            Equipo
          </div>
        </div>
      </nav>
    </aside>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      <div className="pl-20">
      {/* Header profesional con colores de empresa */}
      <header className="fixed top-0 w-full bg-[#0B0F1A]/95 backdrop-blur-sm shadow-lg z-30 border-b border-[#3A86FF]/30">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#E63946] to-[#FF4D8B] rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">VK</span>
              </div>
              <h1 className="text-xl font-bold text-white">
                VIRTUAL KNOCKOUT
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <Link 
                to="/" 
                className="text-[#B0B3C5] hover:text-[#3A86FF] transition-colors font-medium"
              >
                Inicio
              </Link>
              <span className="px-4 py-2 bg-rose-600 text-white rounded-lg font-medium shadow-lg">
                Juego
              </span>
              <Link 
                to="/proyecto"
                className="text-[#B0B3C5] hover:text-[#3A86FF] transition-colors font-medium"
              >
                Proyecto
              </Link>
              
              {/* Botón de Descarga integrado */}
              <button 
                onClick={handleDownload}
                disabled={isDownloading}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 border-2 ${
                  isDownloading 
                    ? 'bg-gray-700 border-gray-600 text-gray-300 cursor-not-allowed' 
                    : 'bg-transparent border-[#3A86FF] text-[#3A86FF] hover:bg-[#3A86FF] hover:text-white hover:shadow-lg hover:shadow-[#3A86FF]/30'
                }`}
                title={isDownloading ? 'Descargando...' : 'Descargar el juego'}
              >
                <span className="flex items-center gap-2">
                  {isDownloading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      {downloadProgress}%
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                      Descarga
                    </>
                  )}
                </span>
                
                {/* Barra de progreso */}
                {isDownloading && (
                  <div className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-lg overflow-hidden w-full">
                    <div 
                      className="h-full bg-white transition-all duration-300 ease-out"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>


      {/* Hero Section - Fullscreen */}
      {activeSection === 'hero' && (
        <section className="section-fullscreen flex items-center justify-center relative overflow-hidden">
          {/* GIF de fondo optimizado */}
          <div 
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#050812] to-[#0A0F1A]"
            style={{
              backgroundImage: `url('${import.meta.env.BASE_URL}BOXER.gif')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              willChange: 'auto',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
            }}
          ></div>
        <div className="container mx-auto px-4 text-center relative z-10 pt-20">
          <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] via-[#FF4D8B] to-[#FFD700] mb-8 tracking-tight drop-shadow-2xl">
            VIRTUAL KNOCKOUT
          </h2>
          <div className="mb-12 max-w-4xl mx-auto">
            <p className="text-2xl md:text-4xl font-bold leading-relaxed text-center mb-4 text-white drop-shadow-2xl" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(230,57,70,0.5)' }}>
              <span className="text-[#FFD700]">Experiencia inmersiva</span> de boxeo en realidad virtual
            </p>
            <p className="text-xl md:text-2xl text-center leading-relaxed font-semibold text-white drop-shadow-2xl" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.9), 0 0 15px rgba(58,134,255,0.4)' }}>
              Que combina <span className="text-[#3A86FF] font-bold">tecnología avanzada</span> con <span className="text-[#FF4D8B] font-bold">entrenamiento deportivo</span>
            </p>
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
            {/* Título impactante mejorado */}
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] via-[#FF4D8B] to-[#FFD700] mb-4 tracking-tight leading-tight">
                EL RING TE ESPERA
              </h2>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-1 bg-gradient-to-r from-transparent to-[#E63946] rounded-full"></div>
                <span className="text-2xl md:text-4xl font-bold text-white animate-pulse">
                  ⚡ ¿TIENES LO NECESARIO? ⚡
                </span>
                <div className="w-16 h-1 bg-gradient-to-l from-transparent to-[#E63946] rounded-full"></div>
              </div>
              <p className="text-xl md:text-2xl text-white/90 font-medium max-w-4xl mx-auto">
                Entra al ring más desafiante del mundo virtual. Solo los valientes se atreven a enfrentar el combate definitivo.
              </p>
            </div>
            <div className="flex flex-col gap-16">
          {/* Fila 1: ¿En qué consiste? (texto izquierda, imagen derecha) */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/5 order-2 md:order-1">
                <div className="bg-gradient-to-r from-[#0B0F1A] to-[#0B0F1A]/80 rounded-xl p-8 shadow-lg border border-[#3A86FF]/30 backdrop-blur-sm">
                <h4 className="text-2xl font-bold text-[#E63946] mb-6">¿En qué consiste?</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🥊</span>
                    <p className="text-base text-white leading-relaxed">
                      <strong className="text-[#FFD700]">Enfréntate a oponentes desafiantes</strong> en un combate VR visceral.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🔥</span>
                    <p className="text-base text-white leading-relaxed">
                      <strong className="text-[#FF4D8B]">Suda de verdad</strong> con un sistema de juego físicamente activo.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🏆</span>
                    <p className="text-base text-white leading-relaxed">
                      <strong className="text-[#3A86FF]">Conquista el cinturón</strong> y conviértete en el campeón definitivo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-4/5 flex justify-center order-1 md:order-2">
              <img 
                src={`${import.meta.env.BASE_URL}descripcion1.png`} 
                alt="Gameplay Virtual Knockout" 
                className="w-full h-96 object-cover rounded-2xl border-2 border-[#3A86FF]/50 shadow-2xl" 
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Fila 2: Objetivo (imagen izquierda, texto derecha) */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-4/5 flex justify-center mb-4 md:mb-0">
              <img
                src={`${import.meta.env.BASE_URL}objetivo1.png`}
                alt="Objetivo Virtual Knockout"
                className="w-full h-96 object-cover rounded-2xl border-2 border-[#E63946]/50 shadow-2xl"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="md:w-1/5">
              <div className="bg-gradient-to-r from-[#0B0F1A] to-[#0B0F1A]/80 rounded-xl p-8 shadow-lg border border-[#3A86FF]/30 backdrop-blur-sm">
                <h5 className="text-xl font-semibold text-[#E63946] mb-2">Objetivo</h5>
                <p className="text-base text-white">Derrota a tu oponente usando combinaciones de golpes, movimientos defensivos y estrategia de combate. Tu misión es simple: <span className='font-bold text-[#FFD700]'>¡Knockearlo antes de que él te knockee a ti!</span></p>
              </div>
            </div>
          </div>

          {/* Fila 3: ¿Listo para la acción? (texto izquierda, imagen derecha) */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/5 order-2 md:order-1 px-4">
              <p className="text-xl text-white font-semibold mb-8 leading-relaxed">¿Listo para sudar, esquivar y golpear como un campeón?</p>
              <div className="flex flex-col gap-4 w-full mb-8">
                <div className="bg-gradient-to-br from-[#050812] to-[#0A0F1A] rounded-lg shadow-lg p-4 flex items-center gap-3 border border-[#3A86FF]/30">
                  <span className="text-2xl text-[#3A86FF]">⚡</span>
                  <div className="flex-1">
                    <span className="font-bold text-sm text-[#E63946] block">Combate Rápido</span>
                    <span className="text-white/80 text-xs">Esquiva y contraataca en tiempo real.</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#050812] to-[#0A0F1A] rounded-lg shadow-lg p-4 flex items-center gap-3 border border-[#E63946]/30">
                  <span className="text-2xl text-[#E63946]">💥</span>
                  <div className="flex-1">
                    <span className="font-bold text-sm text-[#E63946] block">Knockout Épico</span>
                    <span className="text-white/80 text-xs">Busca la oportunidad perfecta para el KO.</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#050812] to-[#0A0F1A] rounded-lg shadow-lg p-4 flex items-center gap-3 border border-[#FF4D8B]/30">
                  <span className="text-2xl text-[#FF4D8B]">🥊</span>
                  <div className="flex-1">
                    <span className="font-bold text-sm text-white block">Técnicas de Boxeo</span>
                    <span className="text-white/80 text-xs">Jabs, ganchos y uppercuts virtuales.</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#050812] to-[#0A0F1A] rounded-lg shadow-lg p-4 flex items-center gap-3 border border-[#FFD700]/30">
                  <span className="text-2xl text-[#FFD700]">🏆</span>
                  <div className="flex-1">
                    <span className="font-bold text-sm text-[#FFD700] block">Campeón Invicto</span>
                    <span className="text-white/80 text-xs">Mantente como el último en pie.</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-4/5 flex justify-center order-1 md:order-2">
              <img 
                src={`${import.meta.env.BASE_URL}cinturon.png`} 
                alt="Acción Virtual Knockout" 
                className="w-full h-96 object-cover rounded-2xl border-2 border-[#FFD700]/50 shadow-2xl" 
                loading="lazy"
                decoding="async"
              />
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
                className="border-2 border-[#3A86FF]/30 bg-gradient-to-r from-[#0B0F1A] to-[#0B0F1A]/80 backdrop-blur-sm shadow-xl"
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
                            openImageModal(`${import.meta.env.BASE_URL}${media.url.replace('/', '')}`, index);
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
                            loading="lazy"
                            decoding="async"
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
      
      </div>

      {/* Modal para ver imagen expandida con navegación */}
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
            
            {/* Botón cerrar */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 w-12 h-12 bg-black/70 hover:bg-black/90 border border-white/20 text-white rounded-lg flex items-center justify-center text-xl font-bold transition-all duration-300 hover:scale-110"
              title="Cerrar imagen"
            >
              ✕
            </button>
            
            {/* Botones de navegación - Solo se muestran si hay más de una imagen */}
            {currentImageSet.length > 1 && (
              <>
                {/* Botón anterior */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateModalImage('prev');
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 border border-white/20 text-white rounded-lg flex items-center justify-center text-2xl font-bold transition-all duration-300 hover:scale-110"
                  title="Imagen anterior (← tecla)"
                >
                  ←
                </button>
                
                {/* Botón siguiente */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateModalImage('next');
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 border border-white/20 text-white rounded-lg flex items-center justify-center text-2xl font-bold transition-all duration-300 hover:scale-110"
                  title="Imagen siguiente (→ tecla)"
                >
                  →
                </button>
                
                {/* Indicador de posición */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm border border-white/20">
                  {currentImageIndex + 1} de {currentImageSet.length}
                </div>
              </>
            )}
            
            {/* Instrucciones */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm text-center border border-white/20">
              {currentImageSet.length > 1 ? (
                <>Usa las flechas ← → o los botones para navegar • ESC para cerrar</>
              ) : (
                <>Click fuera de la imagen o presiona ESC para cerrar</>
              )}
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
          <div className="relative w-full max-w-6xl aspect-video">
            {/* Botón de cerrar fuera del iframe */}
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 -right-4 w-12 h-12 bg-gray-800 hover:bg-gray-700 border-2 border-white text-white rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 hover:scale-110 z-20 shadow-2xl"
              title="Cerrar video"
            >
              ✕
            </button>
            
            {/* Iframe del video sin superposiciones */}
            <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
                title="Video de YouTube"
                className="w-full h-full aspect-video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;