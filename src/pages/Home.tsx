import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">VR Studio</h1>
            <div className="flex space-x-6">
              <Link to="#nosotros" className="text-muted-foreground hover:text-foreground transition-colors">
                Nosotros
              </Link>
              <Link to="/juego" className="text-muted-foreground hover:text-foreground transition-colors">
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
      <section className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            VR Studio
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Creamos experiencias inmersivas de realidad virtual que transforman la manera en que interactúas con el mundo digital
          </p>
          <Button size="lg" className="text-lg px-8 py-3">
            Explorar Proyectos
          </Button>
        </div>
      </section>

      {/* Mission Section */}
      <section id="nosotros" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
              Nuestra Misión
            </h2>
            
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl">Innovación en Realidad Virtual</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  En VR Studio, nos dedicamos a desarrollar experiencias de realidad virtual innovadoras y accesibles. 
                  Nuestro objetivo es crear aplicaciones que no solo entretengan, sino que también eduquen y conecten 
                  a las personas de maneras completamente nuevas. Creemos que la VR tiene el poder de transformar 
                  industrias enteras y mejorar la calidad de vida de las personas.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>🎯 Visión</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ser líderes en el desarrollo de experiencias VR que redefinan los límites entre el mundo físico y digital.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>💡 Innovación</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Utilizamos las últimas tecnologías para crear experiencias inmersivas únicas y memorables.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>🤝 Colaboración</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Trabajamos en equipo para superar desafíos técnicos y crear productos excepcionales.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project Preview */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-foreground">
            Proyecto Destacado
          </h2>
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Virtual Knockout</CardTitle>
              <CardDescription className="text-lg">
                Un juego de boxeo en realidad virtual que te permite sentir la adrenalina del ring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-background rounded-lg mb-6 flex items-center justify-center">
                <p className="text-muted-foreground">Vista previa del juego</p>
              </div>
              <Button size="lg" className="w-full">
                <Link to="/juego" className="block w-full">Ver Desarrollo del Juego</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 VR Studio - Curso de Interacción Humano-Computadora
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;