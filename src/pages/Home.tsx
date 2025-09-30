import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gamepad2, GraduationCap, Building2, Play, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20" />
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_100%)]"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Floating geometric shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 border-2 border-cyan-500/20 rounded-lg rotate-12 animate-pulse" />
        <div className="absolute top-1/3 right-20 w-32 h-32 border-2 border-purple-500/20 rounded-lg -rotate-12" style={{ animation: 'pulse 3s ease-in-out infinite' }} />
        <div className="absolute bottom-40 left-1/4 w-48 h-48 border-2 border-pink-500/15 rounded-lg rotate-45" style={{ animation: 'pulse 4s ease-in-out infinite' }} />
      </div>

      {/* Header - Minimal */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-xl">
  <div className="container mx-auto px-6 py-4">
    <nav className="flex items-center justify-between">
      
      {/* Logo clickable */}
      <Link to="/" className="flex items-center gap-4 group">
        <img 
          src={`${import.meta.env.BASE_URL}sinfondo.png`}
          alt="NextZone VR Logo" 
          className="h-12 w-auto group-hover:scale-105 transition-transform"
        />
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            NEXTZONE
          </h1>
          <p className="text-xs text-gray-500">VR Studio</p>
        </div>
      </Link>

      {/* Navegación */}
      <div className="flex space-x-10">
        <Link 
          to="/juego" 
          className="text-gray-300 hover:text-cyan-400 transition-colors text-base font-medium"
        >
          Juego
        </Link>
        <a 
          href="#servicios" 
          className="text-gray-300 hover:text-cyan-400 transition-colors text-base font-medium"
        >
          Servicios
        </a>
        <a 
          href="#proyecto" 
          className="text-gray-300 hover:text-cyan-400 transition-colors text-base font-medium"
        >
          Proyecto
        </a>
        <a href=""
        className='text-gray-300 hover:text-cyan-400 transition-colors text-base font-medium'>
          Nosotros
        </a>
      </div>
    </nav>
  </div>
</header>

      {/* SCROLL 1: HERO - Full viewport */}
<section className="min-h-screen flex items-center justify-center relative pt-12">
  <div className="container mx-auto px-6 text-center relative z-10">
    
    {/* Logo reducido */}
    <div className="flex justify-center mb-8">
      <div className="relative group perspective-1000">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
        <img 
          src={`${import.meta.env.BASE_URL}sinfondo.png`}
          alt="NextZone VR" 
          className="relative h-40 w-auto transform transition-all duration-300 ease-out"
          style={{
            transform: `perspective(1000px) rotateY(${mousePosition.x * 1.7}deg) rotateX(${-mousePosition.y * 1.7}deg) scale(${1 + Math.abs(mousePosition.x + mousePosition.y) * 0.001})`
          }}
        />
      </div>
    </div>

    {/* Títulos compactos */}
    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
      <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        Experiencias VR
      </span>
      <br />
      <span className="text-white text-2xl md:text-4xl">
        Que Revolucionan
      </span>
    </h1>
    
    {/* Texto reducido */}
    <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
      Desarrollamos <span className="text-cyan-400 font-semibold">videojuegos VR</span>, 
      <span className="text-purple-400 font-semibold"> simulaciones de entrenamiento</span> y 
      <span className="text-pink-400 font-semibold"> experiencias inmersivas</span> con tecnología de última generación
    </p>

    {/* Botones compactos */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
      <Button 
        size="lg" 
        className="text-lg px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 border-0 shadow-xl shadow-cyan-500/30 group"
      >
        <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
        Ver Demo VR
      </Button>
      <Button
        asChild
        size="lg"
        className="text-lg px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 border-0 shadow-lg shadow-purple-500/30 group"
      >
        <a href="#proyecto">
          Nuestros Proyectos
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
        </a>
      </Button>
    </div>

    {/* Stats más compactas */}
    <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
      <div>
        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent mb-1">1+</div>
        <div className="text-gray-400 text-sm md:text-base">Proyectos VR</div>
      </div>
      <div>
        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-1">Meta Quest</div>
        <div className="text-gray-400 text-sm md:text-base">Compatible</div>
      </div>
      <div>
        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent mb-1">Unity</div>
        <div className="text-gray-400 text-sm md:text-base">Engine</div>
      </div>
    </div>
  </div>

  {/* Scroll indicator */}
  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
    <div className="w-5 h-8 border-2 border-cyan-500/50 rounded-full flex justify-center p-1">
      <div className="w-1 h-2 bg-cyan-500 rounded-full animate-pulse" />
    </div>
  </div>
</section>

    {/* SCROLL 2: SERVICIOS VR - Compacto pero más grande */}
<section id="servicios" className="h-screen flex items-center py-16 relative">
  <div className="container mx-auto px-6">
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-5">
        <Sparkles className="w-5 h-5 text-cyan-400" />
        <span className="text-cyan-400 font-semibold text-base">Especialidades</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          ¿Qué Creamos?
        </span>
      </h2>
      <p className="text-lg text-gray-400 max-w-3xl mx-auto">
        Soluciones de realidad virtual para <span className="text-cyan-400 font-medium">entretenimiento</span>, 
        <span className="text-purple-400 font-medium"> educación</span> e 
        <span className="text-pink-400 font-medium"> industria</span>.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* VR Gaming */}
      <Card className="bg-slate-900/50 border-cyan-500/40 backdrop-blur-sm hover:border-cyan-500 transition-all hover:shadow-2xl hover:shadow-cyan-500/20 group hover:-translate-y-2 duration-300">
        <CardHeader>
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-all">
            <Gamepad2 className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl text-white mb-3">VR Gaming</CardTitle>
          <p className="text-gray-400 text-base leading-relaxed mb-4">
            Videojuegos inmersivos con física realista y multijugador. 
            <span className="block mt-2 text-cyan-400 font-semibold text-sm">
              Meta Quest, PSVR2
            </span>
          </p>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>Acción, deportes y aventura</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>Física hiperrealista</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>Modo multijugador online</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Entrenamiento VR */}
      <Card className="bg-slate-900/50 border-purple-500/40 backdrop-blur-sm hover:border-purple-500 transition-all hover:shadow-2xl hover:shadow-purple-500/20 group hover:-translate-y-2 duration-300">
        <CardHeader>
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-all">
            <GraduationCap className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl text-white mb-3">Entrenamiento VR</CardTitle>
          <p className="text-gray-400 text-base leading-relaxed mb-4">
            Simulaciones profesionales médicas e industriales.
            <span className="block mt-2 text-purple-400 font-semibold text-sm">
              Reducción de riesgos 90%
            </span>
          </p>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">▸</span>
              <span>Procedimientos médicos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">▸</span>
              <span>Seguridad industrial</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">▸</span>
              <span>Certificaciones oficiales</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* VR Corporativo */}
      <Card className="bg-slate-900/50 border-pink-500/40 backdrop-blur-sm hover:border-pink-500 transition-all hover:shadow-2xl hover:shadow-pink-500/20 group hover:-translate-y-2 duration-300">
        <CardHeader>
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500 to-pink-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-all">
            <Building2 className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl text-white mb-3">VR Corporativo</CardTitle>
          <p className="text-gray-400 text-base leading-relaxed mb-4">
            Tours virtuales, showrooms y eventos interactivos.
            <span className="block mt-2 text-pink-400 font-semibold text-sm">
              360° inmersión total
            </span>
          </p>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-pink-400 mt-1">▸</span>
              <span>Tours inmobiliarios VR</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-400 mt-1">▸</span>
              <span>Showrooms de productos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-400 mt-1">▸</span>
              <span>Eventos virtuales</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
</section>

{/* SCROLL 3: PROYECTO + FOOTER - Full viewport */}
<section id="proyecto" className="min-h-screen flex flex-col relative">
  <div className="flex-1 flex items-center py-16"> {/* antes py-24 */}
    <div className="container mx-auto px-6">
      <div className="text-center mb-12"> {/* antes mb-16 */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4">
          <Play className="w-4 h-4 text-purple-400" />
          <span className="text-purple-400 font-semibold text-base">Destacado</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Virtual Knockout
          </span>
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          El juego de boxeo VR más realista del mercado
        </p>
      </div>

      <Card className="max-w-4xl mx-auto bg-slate-900/70 border-purple-500/40 backdrop-blur-sm overflow-hidden hover:border-purple-500 transition-all group">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Visual Preview */}
          <div className="aspect-square md:aspect-auto bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-cyan-500/20 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(2,6,23,0.7)_100%)]" />
            <div className="relative text-center p-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4 mx-auto group-hover:scale-105 transition-transform">
                <Gamepad2 className="w-12 h-12" />
              </div>
              <p className="text-gray-300 text-lg font-semibold">Combate VR Realista</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-white mb-4">Virtual Knockout</h3>
            <p className="text-gray-300 text-base mb-6 leading-relaxed" aria-label="Descripción simple">
              Disfruta combates uno a uno con un sistema de stamina, combos dinámicos y un oponente desafiante.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400" />
                <span className="text-gray-300 text-sm">Motor Unity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-pink-400" />
                <span className="text-gray-300 text-sm">Compatible Meta Quest 2/3, PSVR2</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs border border-purple-500/40 font-medium">Unity Engine</span>
              <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs border border-pink-500/40 font-medium">Meta Quest</span>
            </div>

            <Button
              asChild
              size="lg"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 border-0 text-lg py-5 shadow-lg shadow-purple-500/30"
            >
              <Link to="/juego">
                Ver Desarrollo Completo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  </div>

  {/* Footer sin cambios */}
  <footer className="border-t border-cyan-500/20 py-12 bg-slate-950/50 backdrop-blur-sm mt-auto">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <img 
            src={`${import.meta.env.BASE_URL}sinfondo.png`} 
            alt="NextZone VR" 
            className="h-16 w-auto"
          />
          <div>
            <p className="text-white font-bold text-xl">NEXTZONE</p>
            <p className="text-gray-500">Virtual Reality Studio</p>
            <p className="text-gray-600 text-sm mt-1">Unity • Meta Quest • PSVR2</p>
          </div>
        </div>
        <div className="text-center md:text-right">
          <p className="text-gray-400 mb-2">
            © 2025 NextZone VR Studio
          </p>
          <p className="text-gray-600 text-sm">
            Curso de Interacción Humano-Computadora
          </p>
        </div>
      </div>
    </div>
  </footer>
</section>
    </div>
  );
};

export default Home;