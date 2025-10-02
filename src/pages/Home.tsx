
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gamepad2, GraduationCap, Building2, Play, ArrowRight, Sparkles, Home as HomeIcon } from 'lucide-react'; 
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('inicio'); 

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('Sección detectada:', entry.target.id); // Debug temporal
          setActiveSection(entry.target.id);
        }
      });
    }, { 
      threshold: 0.3, 
      rootMargin: '-20% 0px -20% 0px' 
    });

    const sections = ['inicio', 'servicios', 'proyecto']; // 'nosotros' eliminado del array
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  // --- Paleta de Colores para el Contenido ---
  const ACCENT_RED = 'rose-600';     // Rojo/Rosa Vibrante
  const ACCENT_ORANGE = 'amber-400'; // Naranja/Amarillo
  const ACCENT_VIOLET = '#3A86FF';// Violeta Oscuro
  // CORREGIDO: Usaremos la clase directamente en el JSX
  const BG_COLOR = 'slate-950';



  // Función para generar la clase del enlace del Header
  const getHeaderLinkClass = (sectionId: string) => {
    const isActive = activeSection === sectionId;
    return isActive
  ? "px-4 py-2 bg-rose-600 text-white rounded-lg font-medium shadow-lg transition"
  : "text-gray-400 hover:text-rose-600 transition-colors font-medium";
  };

  const Sidebar = () => (
    // CORREGIDO: Usamos rose-600
    <aside className={`fixed left-0 top-0 z-40 h-full w-20 bg-gray-900/90 backdrop-blur-sm shadow-xl shadow-black/50 flex flex-col items-center justify-center border-r border-rose-600/20`}>      
      <nav className="flex flex-col space-y-6">
        {/* Botón Inicio */}
        <div className="relative group">
          <a
            href="#inicio"
            onClick={() => setActiveSection('inicio')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              activeSection === 'inicio' 
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/50' 
                : 'bg-gray-800 border border-rose-600/20 text-gray-400 hover:bg-rose-600/20 hover:text-rose-400'
            }`}
          >
            <HomeIcon className="w-5 h-5" />
          </a>
          {/* Tooltip expandible */}
          <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg border border-rose-600/30 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
            Inicio
          </div>
        </div>

        {/* Botón Servicios */}
        <div className="relative group">
          <a
            href="#servicios"
            onClick={() => setActiveSection('servicios')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              activeSection === 'servicios' 
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/50' 
                : 'bg-gray-800 border border-rose-600/20 text-gray-400 hover:bg-rose-600/20 hover:text-rose-400'
            }`}
          >
            <Sparkles className="w-5 h-5" />
          </a>
          {/* Tooltip expandible */}
          <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg border border-rose-600/30 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
            Servicios
          </div>
        </div>

        {/* Botón Juegos */}
        <div className="relative group">
          <a
            href="#proyecto"
            onClick={() => setActiveSection('proyecto')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              activeSection === 'proyecto' 
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/50' 
                : 'bg-gray-800 border border-rose-600/20 text-gray-400 hover:bg-rose-600/20 hover:text-rose-400'
            }`}
          >
            <Gamepad2 className="w-5 h-5" />
          </a>
          {/* Tooltip expandible */}
          <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg border border-rose-600/30 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
            Juegos
          </div>
        </div>
      </nav>
    </aside>
  );

  return (
    // CORREGIDO: Usando la clase literal de Tailwind. El fondo ahora es oscuro.
    <div className={`min-h-screen bg-slate-950 text-white overflow-x-hidden`}>
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        {/* CORREGIDO: Usando clases literales para los gradientes */}
        <div className={`absolute inset-0 bg-gradient-to-br from-rose-600/20 via-violet-600/20 to-amber-400/20`} />
        <div
          // CORREGIDO: Se mantiene el fondo oscuro aquí
          className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_100%)]`}
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none" style={{
        // CORREGIDO: Usando rose-600. Tailwind no interpreta variables JS aquí.
        backgroundImage: `linear-gradient(rgba(225, 29, 72, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(225, 29, 72, 0.3) 1px, transparent 1px)`, // Este es el color rose-600 en rgba
        backgroundSize: '60px 60px'
      }} />

      {/* Floating geometric shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* CORREGIDO: Usando clases literales */}
        <div className={`absolute top-20 left-10 w-40 h-40 border-2 border-rose-600/20 rounded-lg rotate-12 animate-pulse`} />
        <div className={`absolute top-1/3 right-20 w-32 h-32 border-2 border-amber-400/20 rounded-lg -rotate-12`} style={{ animation: 'pulse 3s ease-in-out infinite' }} />
        <div className={`absolute bottom-40 left-1/4 w-48 h-48 border-2 border-violet-600/15 rounded-lg rotate-45`} style={{ animation: 'pulse 4s ease-in-out infinite' }} />
      </div>
      
      {/* --- SIDEBAR --- */}
      <Sidebar />
      
      <div className="pl-20"> 

        {/* Header unificado */}
        <Header />

{/* SCROLL 1: HERO - AJUSTADO CON MENOS AMARILLO */}
<section id="inicio" className="min-h-screen flex items-center justify-center relative pt-12">
  <div className="container mx-auto px-6 text-center relative z-10">
    
    {/* Logo más grande */}
    <div className="flex justify-center mb-8">
      <div className="relative group perspective-1000">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-[#3A86FF] blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
        <img 
          src={`${import.meta.env.BASE_URL}nextZone.png`}
          alt="NextZone VR" 
          className="relative h-48 w-auto transform transition-all duration-300 ease-out"
          style={{
            transform: `perspective(1000px) rotateY(${mousePosition.x * 1.7}deg) rotateX(${-mousePosition.y * 1.7}deg) scale(${1 + Math.abs(mousePosition.x + mousePosition.y) * 0.001})`
          }}
        />
      </div>
    </div>

    {/* Títulos compactos con paleta vibrante */}
    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
      <span className="bg-gradient-to-r from-rose-600 via-[#3A86FF] to-orange-500 bg-clip-text text-transparent">
        Experiencias VR
      </span>
      <br />
      <span className="text-white text-2xl md:text-4xl drop-shadow-lg">
        Que Revolucionan
      </span>
    </h1>
    
    {/* Texto reducido */}
    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
      Desarrollamos <span className="text-rose-600 font-semibold">videojuegos VR</span>, 
      <span className="text-[#3A86FF] font-semibold"> simulaciones de entrenamiento</span> y 
      <span className="text-orange-500 font-semibold"> experiencias inmersivas</span> con tecnología de última generación
    </p>

    {/* Botones con degradados vibrantes */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
      
      <Button
        asChild
        size="lg"
        className="text-lg px-8 py-4 bg-gradient-to-r from-[#3A86FF] to-rose-600 hover:from-[#3A86FF]/90 hover:to-rose-600/90 border-0 shadow-lg shadow-blue-500/30 group"
      >
        <a href="#proyecto">
          Nuestros Proyectos
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
        </a>
      </Button>
    </div>

    {/* Stats con colores */}
    <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
      <div>
        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent mb-1">1+</div>
        <div className="text-gray-400 text-sm md:text-base">Proyectos VR</div>
      </div>
      <div>
        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#3A86FF] to-rose-600 bg-clip-text text-transparent mb-1">Meta Quest</div>
        <div className="text-gray-400 text-sm md:text-base">Compatible</div>
      </div>
      <div>
        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent mb-1">Unity</div>
        <div className="text-gray-400 text-sm md:text-base">Engine</div>
      </div>
    </div>
  </div>

  {/* Scroll indicator */}
  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
    <div className="w-5 h-8 border-2 border-rose-600/50 rounded-full flex justify-center p-1">
      <div className="w-1 h-2 bg-rose-600 rounded-full animate-pulse" />
    </div>
  </div>
</section>

        {/* SCROLL 2: SERVICIOS VR - AHORA UNIFICADO A LA PALETA ROSE/AMBER/VIOLET */}
        <section id="servicios" className="h-screen flex items-center py-16 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              {/* CORREGIDO: Usamos amber-400 */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-400/10 border border-amber-400/30 mb-5">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className=" from-orange-500 font-semibold text-base">Especialidades</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {/* CORREGIDO: Usamos rose-600 y violet-600 */}
                <span className="bg-gradient-to-r from-rose-600 to-violet-600 bg-clip-text text-transparent">
                  ¿Qué Creamos?
                </span>
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                {/* CORREGIDO: Usamos rose-600, violet-600 y amber-400 */}
                Soluciones de realidad virtual para <span className="text-rose-600 font-medium">entretenimiento</span>, 
                <span className="text-violet-600 font-medium"> educación</span> e 
                <span className=" from-orange-500 font-medium"> industria</span>.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* VR Gaming */}
              <Card className="bg-slate-900/50 border-rose-600/40 backdrop-blur-sm hover:border-rose-600 transition-all hover:shadow-2xl hover:shadow-rose-600/20 group hover:-translate-y-2 duration-300">
                <CardHeader>
                  {/* CORREGIDO: Usamos rose-600 y rose-700 */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-rose-600 to-rose-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-all">
                    <Gamepad2 className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl text-white mb-3">VR Gaming</CardTitle>
                  <p className="text-gray-400 text-base leading-relaxed mb-4">
                    Videojuegos inmersivos con física realista y multijugador.
                    {/* CORREGIDO: Usamos rose-600 */}
                    <span className="block mt-2 text-rose-600 font-semibold text-sm">
                      Meta Quest, PSVR2
                    </span>
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li className="flex items-start gap-2">
                      {/* CORREGIDO: Usamos rose-600 */}
                      <span className="text-rose-600 mt-1">▸</span>
                      <span>Acción, deportes y aventura</span>
                    </li>
                    <li className="flex items-start gap-2">
                      {/* CORREGIDO: Usamos rose-600 */}
                      <span className="text-rose-600 mt-1">▸</span>
                      <span>Física hiperrealista</span>
                    </li>
                    <li className="flex items-start gap-2">
                      {/* CORREGIDO: Usamos rose-600 */}
                      <span className="text-rose-600 mt-1">▸</span>
                      <span>Modo multijugador online</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Entrenamiento VR */}
              <Card className="bg-slate-900/50 border-violet-600/40 backdrop-blur-sm hover:border-violet-600 transition-all hover:shadow-2xl hover:shadow-violet-600/20 group hover:-translate-y-2 duration-300">
                <CardHeader>
                  {/* CORREGIDO: Usamos violet-600 y violet-700 */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-600 to-violet-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-all">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl text-white mb-3">Entrenamiento VR</CardTitle>
                  <p className="text-gray-400 text-base leading-relaxed mb-4">
                    Simulaciones profesionales médicas e industriales.
                    {/* CORREGIDO: Usamos violet-600 */}
                    <span className="block mt-2 text-violet-600 font-semibold text-sm">
                      Reducción de riesgos 90%
                    </span>
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li className="flex items-start gap-2">
                      {/* CORREGIDO: Usamos violet-600 */}
                      <span className="text-violet-600 mt-1">▸</span>
                      <span>Procedimientos médicos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      {/* CORREGIDO: Usamos violet-600 */}
                      <span className="text-violet-600 mt-1">▸</span>
                      <span>Seguridad industrial</span>
                    </li>
                    <li className="flex items-start gap-2">
                      {/* CORREGIDO: Usamos violet-600 */}
                      <span className="text-violet-600 mt-1">▸</span>
                      <span>Certificaciones oficiales</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* VR Corporativo */}
              <Card className="bg-slate-900/50 border-amber-400/40 backdrop-blur-sm hover:border-amber-400 transition-all hover:shadow-2xl hover:shadow-amber-400/20 group hover:-translate-y-2 duration-300">
                <CardHeader>
                  {/* CORREGIDO: Usamos amber-400 y amber-600 */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-all">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl text-white mb-3">VR Corporativo</CardTitle>
                  <p className="text-gray-400 text-base leading-relaxed mb-4">
                    Tours virtuales, showrooms y eventos interactivos.
                    {/* CORREGIDO: Usamos amber-400 */}
                    <span className="block mt-2 text-amber-400 font-semibold text-sm">
                      360° inmersión total
                    </span>
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li className="flex items-start gap-2">
                      {/* CORREGIDO: Usamos amber-400 */}
                      <span className="text-amber-400 mt-1">▸</span>
                      <span>Tours inmobiliarios VR</span>
                    </li>
                    <li className="flex items-start gap-2">
                      {/* CORREGIDO: Usamos amber-400 */}
                      <span className="text-amber-400 mt-1">▸</span>
                      <span>Showrooms de productos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      {/* CORREGIDO: Usamos amber-400 */}
                      <span className="text-amber-400 mt-1">▸</span>
                      <span>Eventos virtuales</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* SCROLL 3: PROYECTO + FOOTER - Ya estaba corregida en el paso anterior, pero la incluyo completa por coherencia */}
        <section id="proyecto" className="min-h-screen flex flex-col relative">
          <div className="flex-1 flex items-center py-16">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-600/10 border border-violet-600/30 mb-4">
                  <Play className="w-4 h-4 text-violet-600" />
                  <span className="text-violet-600 font-semibold text-base">Destacado</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-violet-600 to-rose-600 bg-clip-text text-transparent">
                    Virtual Knockout
                  </span>
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                  El juego de boxeo VR más realista del mercado
                </p>
              </div>

              <Card className="max-w-4xl mx-auto bg-slate-900/70 border-violet-600/40 backdrop-blur-sm overflow-hidden hover:border-violet-600 transition-all group">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Visual Preview */}
                  <div className="aspect-square md:aspect-auto bg-gradient-to-br from-violet-600/30 via-rose-600/20 to-amber-400/20 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(2,6,23,0.7)_100%)]" />
                    <div className="relative text-center p-6">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-600 to-rose-600 flex items-center justify-center mb-4 mx-auto group-hover:scale-105 transition-transform">
                        <Gamepad2 className="w-12 h-12 text-white" />
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
                        <div className="w-2 h-2 rounded-full bg-violet-600" />
                        <span className="text-gray-300 text-sm">Motor Unity</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-rose-600" />
                        <span className="text-gray-300 text-sm">Compatible Meta Quest 2/3, PSVR2</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-3 py-1 rounded-full bg-violet-600/20 text-violet-500 text-xs border border-violet-600/40 font-medium">Unity Engine</span>
                      <span className="px-3 py-1 rounded-full bg-rose-600/20 text-rose-500 text-xs border border-rose-600/40 font-medium">Meta Quest</span>
                    </div>

                    <Button
                      asChild
                      size="lg"
                      className="w-full bg-gradient-to-r from-violet-600 to-rose-600 hover:from-violet-700 hover:to-rose-700 border-0 text-lg py-5 shadow-lg shadow-violet-600/30"
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

          {/* Footer */}
          <footer className="border-t border-[#3A86FF]/30 bg-[#0B0F1A]/95 backdrop-blur-sm shadow-lg py-12 mt-auto">
  <div className="container mx-auto px-6">
    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-4">
        <img 
          src={`${import.meta.env.BASE_URL}nextZone.png`} 
          alt="NextZone VR" 
          className="h-16 w-auto"
        />
        <div>
          <p className="text-xl font-bold bg-gradient-to-r from-[#E63946] to-[#FF4D8B] bg-clip-text text-transparent">
  NEXTZONE
</p>
          <p className="text-gray-400">Virtual Reality Studio</p>
          <p className="text-gray-500 text-sm mt-1">Unity • Meta Quest • PSVR2</p>
        </div>
      </div>
      <div className="text-center md:text-right">
        <p className="text-xl font-bold bg-gradient-to-r from-[#E63946] to-[#FF4D8B] bg-clip-text text-transparent">
  NEXTZONE
</p>
        <p className="text-gray-500 text-sm">
          Curso de Interacción Humano-Computadora
        </p>
      </div>
    </div>
  </div>
</footer>
        </section>
      </div> 
    </div>
  );
};

export default Home;