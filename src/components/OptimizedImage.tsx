import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
  webpSrc?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  placeholder,
  webpSrc
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  // Si hay error, mostrar placeholder
  if (hasError) {
    return (
      <div className={`bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-400">
          <div className="w-12 h-12 mx-auto mb-2 opacity-50">
            📷
          </div>
          <p className="text-xs">Imagen no disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Placeholder mientras carga */}
      {!imageLoaded && placeholder && (
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse ${className}`}
          style={{
            backgroundImage: `url(${placeholder})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(5px)',
          }}
        />
      )}
      
      {/* Imagen optimizada con fallback */}
      <picture>
        {/* WebP para navegadores compatibles */}
        {webpSrc && (
          <source srcSet={webpSrc} type="image/webp" />
        )}
        
        {/* Imagen original como fallback */}
        <img
          src={src}
          alt={alt}
          className={`${className} ${!imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          loading={loading}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
        />
      </picture>
    </div>
  );
};

export default OptimizedImage;