import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
    description: "Queríamos un juego de boxeo VR simple pero intenso",
    media: [
      { type: 'image', url: '/placeholder.svg' },
      { type: 'image', url: '/placeholder.svg' }
    ]
  },
  {
    id: 2,
    title: "Sketching",
    description: "Definimos la temática y los objetivos: reflejos rápidos, golpes potentes y diversión directa",
    media: [
      { type: 'image', url: '/placeholder.svg' },
      { type: 'video', url: '/placeholder.svg', thumbnail: '/placeholder.svg' }
    ]
  },
  {
    id: 3,
    title: "Las Pruebas",
    description: "Mejoramos el juego gracias a los comentarios de nuestros compañeros para que fuera más divertido y cómodo",
    media: [
      { type: 'video', url: '/placeholder.svg', thumbnail: '/placeholder.svg' },
      { type: 'image', url: '/placeholder.svg' }
    ]
  }
];

const Game = () => {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);

  return (
  <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-4 bg-gray-900 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-red-500">VIRTUAL KNOCKOUT</h1>
            <div className="flex space-x-6">
              <Link to="/" className="text-gray-200 hover:text-red-500 transition-colors">
                Inicio
              </Link>
              <Link to="#nosotros" className="text-gray-200 hover:text-red-500 transition-colors">
                Nosotros
              </Link>
              <Link to="#juego" className="text-white font-semibold">
                Juego
              </Link>
              <Link to="#proyecto" className="text-gray-200 hover:text-red-500 transition-colors">
                Proyecto
              </Link>
            </div>
          </nav>
        </div>
      </header>


      {/* Hero Section */}
      <section
        className="py-64 bg-gradient-to-b from-background to-muted relative"
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}fondo_nombre.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            VIRTUAL KNOCKOUT
          </h2>
          <p className="text-xl text-white mb-8">
            Siente el poder en tus puños en el ring de realidad virtual
          </p>
        </div>
        {/* Opcional: capa oscura para mejor contraste */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>
      </section>

      {/* Game Description Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 flex flex-col gap-16">
          {/* Fila 1: ¿En qué consiste? (texto izquierda, imagen derecha) */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 order-2 md:order-1 ">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md mb-2 border border-blue-100 dark:border-blue-800">
                <h4 className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-2">¿En qué consiste?</h4>
                <p className="text-base text-gray-800 dark:text-gray-100">Virtual Knockout es un juego de boxeo en realidad virtual donde te conviertes en boxeador profesional y te enfrentas a distintos obstaculos llenos de acción.</p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center order-1 md:order-2">
              <img src={`${import.meta.env.BASE_URL}descripcion.png`} alt="Gameplay Virtual Knockout" className="w-full max-w-lg h-auto rounded-2xl border border-blue-200 shadow-lg" />
            </div>
          </div>

          {/* Fila 2: Objetivo (imagen izquierda, texto derecha) */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 flex justify-center mb-4 md:mb-0">
              <img
                src={`${import.meta.env.BASE_URL}objetivo.png`}
                alt="Objetivo Virtual Knockout"
                className="w-full max-w-lg h-auto rounded-2xl border border-blue-200 shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow border border-blue-100 dark:border-blue-800">
                <h5 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2">Objetivo</h5>
                <p className="text-base text-gray-700 dark:text-gray-200">Supera los diferente niveles usando reflejos, estrategia y precisión. Esquiva, bloquea y lanza golpes en el momento justo para lograr el <span className='font-bold text-red-600'>¡Knockout!</span></p>
              </div>
            </div>
          </div>

          {/* Fila 3: ¿Listo para la acción? (texto izquierda, imagen derecha) */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 order-2 md:order-1">
              <p className="text-2xl text-gray-700 dark:text-gray-200 font-semibold mb-6">¿Listo para sudar, esquivar y golpear como un campeón?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-8">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-blue-100 dark:border-gray-700">
                  <span className="text-4xl mb-2">⚡</span>
                  <span className="font-bold text-lg text-blue-700 dark:text-blue-300">Reflejos de Acero</span>
                  <span className="text-gray-600 dark:text-gray-300 text-sm mt-1">Reacciona en milisegundos y esquiva golpes como un profesional.</span>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-blue-100 dark:border-gray-700">
                  <span className="text-4xl mb-2">🥊</span>
                  <span className="font-bold text-lg text-blue-700 dark:text-blue-300">Golpes Legendarios</span>
                  <span className="text-gray-600 dark:text-gray-300 text-sm mt-1">Haz que cada puñetazo cuente y busca el KO perfecto.</span>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-blue-100 dark:border-gray-700">
                  <span className="text-4xl mb-2">🎧</span>
                  <span className="font-bold text-lg text-blue-700 dark:text-blue-300">Inmersión Total</span>
                  <span className="text-gray-600 dark:text-gray-300 text-sm mt-1">Gráficos y sonido envolventes para sentirte en el ring real.</span>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-blue-100 dark:border-gray-700">
                  <span className="text-4xl mb-2">🏆</span>
                  <span className="font-bold text-lg text-blue-700 dark:text-blue-300">Conviértete en Leyenda</span>
                  <span className="text-gray-600 dark:text-gray-300 text-sm mt-1">Solo los mejores llegan a la cima. ¿Serás tú el próximo campeón?</span>
                </div>
              </div>
              <a href="#juego" className="mt-2 inline-block px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-xl font-bold rounded-full shadow-lg transition-all duration-200">¡Pruébalo ahora!</a>
            </div>
            <div className="md:w-1/2 flex justify-center order-1 md:order-2">
              <img src={`${import.meta.env.BASE_URL}ganar.png`} alt="Acción Virtual Knockout" className="w-full max-w-lg h-auto rounded-2xl border border-blue-200 shadow-lg" />
            </div>
          </div>
        </div>
      </section>

{/* Timeline Section */}
<section className="py-16 bg-gray-900 shadow-lg">
  <div className="container mx-auto px-4">
    <h3 className="text-3xl font-bold text-center mb-12 text-white">
      Del Boceto al Primer Round
    </h3>
    
    {/* Timeline */}
    <div className="relative max-w-4xl mx-auto">
      {/* Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border"></div>
      
      {/* Timeline Items */}
      <div className="space-y-12">
        {timelineData.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
          >
            <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
              <Card 
                className="cursor-pointer border border-border hover:border-primary/50 hover:shadow-md transition-all"
                onClick={() => setSelectedItem(item)}
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
            
            {/* Timeline Dot */}
            <div className="w-4 h-4 bg-primary rounded-full border-2 border-background shadow-md z-10"></div>
            
            <div className="w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

{/* Media Modal */}
{selectedItem && (
  <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50 p-4 animate-fadeIn">
    <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-foreground">
            {selectedItem.title}
          </CardTitle>
          <button
            onClick={() => setSelectedItem(null)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
        </div>
        <CardDescription className="text-muted-foreground">
          {selectedItem.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedItem.media.map((item, index) => (
            <div 
              key={index} 
              className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden"
            >
              {item.type === 'image' ? (
                <img 
                  src={item.url} 
                  alt={`${selectedItem.title} ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-muted-foreground text-sm">
                  📹 Video {index + 1}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
)}


      {/* Final Details */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-8 text-foreground">
            Herramientas y Creadores
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Tecnología</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Unity</li>
                  <li>• Meta Quest 3</li>
                  <li>• Blender</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Equipo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Los nombres de los integrantes del grupo
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Game;