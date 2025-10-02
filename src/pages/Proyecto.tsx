import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Wrench, Gamepad2 } from 'lucide-react';
import Header from '@/components/Header';

const Proyecto = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050812] via-[#0A0F1A] to-[#0D1420] text-white">
      
      {/* Header con navegación ajustada específicamente para Proyecto */}
      <div className="header-proyecto-fix">
        <Header />
      </div>
      
      {/* CSS específico para ajustar solo la navegación en Proyecto */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .header-proyecto-fix .flex-1 {
            padding-left: 200px;
          }
        `
      }} />

      {/* Sidebar vacío para consistencia visual */}
      <aside className="fixed left-0 top-0 z-40 h-full w-20 bg-gray-900/90 backdrop-blur-sm shadow-xl shadow-black/50 flex flex-col items-center justify-center border-r border-rose-600/20">
        {/* Decoración visual sin botones */}
        <div className="flex flex-col space-y-6">
          {/* Elemento decorativo 1 */}
          <div className="w-12 h-12 rounded-xl bg-gray-800/50 border border-rose-600/10 flex items-center justify-center">
            <div className="w-2 h-2 bg-rose-600/30 rounded-full"></div>
          </div>
          
          {/* Elemento decorativo 2 */}
          <div className="w-12 h-12 rounded-xl bg-gray-800/50 border border-rose-600/10 flex items-center justify-center">
            <div className="w-2 h-2 bg-rose-600/30 rounded-full"></div>
          </div>
          
          {/* Elemento decorativo 3 */}
          <div className="w-12 h-12 rounded-xl bg-gray-800/50 border border-rose-600/10 flex items-center justify-center">
            <div className="w-2 h-2 bg-rose-600/30 rounded-full"></div>
          </div>
        </div>
      </aside>

      <div className="pl-20 flex items-center justify-center min-h-screen pt-20">
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E63946]/10 via-[#FF4D8B]/10 to-[#3A86FF]/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_100%)]" />
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(58, 134, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(58, 134, 255, 0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Content Container */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-[#E63946] to-[#FF4D8B] rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <Wrench className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center">
              <Clock className="w-4 h-4 text-black" />
            </div>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] via-[#FF4D8B] to-[#FFD700] mb-6 tracking-tight">
          ¡Próximamente!
        </h1>

        <div className="space-y-6 mb-8">
          <p className="text-xl md:text-2xl text-white/90 font-medium">
            Esta sección está siendo desarrollada
          </p>
          <p className="text-lg text-white/70 leading-relaxed max-w-lg mx-auto">
            Estamos trabajando arduamente para traerte una experiencia increíble. 
            <span className="text-[#3A86FF] font-semibold"> ¡Mantente atento!</span>
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-[#0B0F1A] to-[#0B0F1A]/80 rounded-xl p-4 border border-[#3A86FF]/30 backdrop-blur-sm">
            <div className="w-8 h-8 bg-[#3A86FF]/20 rounded-lg flex items-center justify-center mb-2 mx-auto">
              <span className="text-[#3A86FF] text-sm">📊</span>
            </div>
            <p className="text-sm text-white/80">Estadísticas detalladas</p>
          </div>
          <div className="bg-gradient-to-br from-[#0B0F1A] to-[#0B0F1A]/80 rounded-xl p-4 border border-[#E63946]/30 backdrop-blur-sm">
            <div className="w-8 h-8 bg-[#E63946]/20 rounded-lg flex items-center justify-center mb-2 mx-auto">
              <span className="text-[#E63946] text-sm">🎯</span>
            </div>
            <p className="text-sm text-white/80">Metas y objetivos</p>
          </div>
          <div className="bg-gradient-to-br from-[#0B0F1A] to-[#0B0F1A]/80 rounded-xl p-4 border border-[#FF4D8B]/30 backdrop-blur-sm">
            <div className="w-8 h-8 bg-[#FF4D8B]/20 rounded-lg flex items-center justify-center mb-2 mx-auto">
              <span className="text-[#FF4D8B] text-sm">📈</span>
            </div>
            <p className="text-sm text-white/80">Progreso en tiempo real</p>
          </div>
        </div>
        

        {/* Footer Note */}
        <p className="text-xs text-white/50 mt-8">
          Mientras tanto, puedes explorar nuestro juego VR de boxeo
        </p>
      </div>

        {/* Floating Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 border border-[#3A86FF]/10 rounded-lg rotate-12 animate-pulse" />
          <div className="absolute top-1/3 right-20 w-24 h-24 border border-[#E63946]/10 rounded-lg -rotate-12" style={{ animation: 'pulse 3s ease-in-out infinite' }} />
          <div className="absolute bottom-40 left-1/4 w-40 h-40 border border-[#FF4D8B]/10 rounded-lg rotate-45" style={{ animation: 'pulse 4s ease-in-out infinite' }} />
        </div>
      </div>
    </div>
  );
};

export default Proyecto;