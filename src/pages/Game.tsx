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
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">VIRTUAL KNOCKOUT</h1>
            <div className="flex space-x-6">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Inicio
              </Link>
              <Link to="#nosotros" className="text-muted-foreground hover:text-foreground transition-colors">
                Nosotros
              </Link>
              <Link to="#juego" className="text-foreground font-medium">
                Juego
              </Link>
              <Link to="#proyecto" className="text-muted-foreground hover:text-foreground transition-colors">
                Proyecto
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            VIRTUAL KNOCKOUT
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Siente el poder en tus puños en el ring de realidad virtual
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
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
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <Card 
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => setSelectedItem(item)}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="w-4 h-4 bg-primary rounded-full border-2 border-background z-10"></div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Media Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{selectedItem.title}</CardTitle>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>
              <CardDescription>{selectedItem.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedItem.media.map((item, index) => (
                  <div key={index} className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    {item.type === 'image' ? (
                      <img 
                        src={item.url} 
                        alt={`${selectedItem.title} ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-muted-foreground">
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