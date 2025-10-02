# Script de Optimización de Imágenes
# Ejecutar este script para optimizar automáticamente las imágenes

# Para Windows (PowerShell)
# Instalar herramientas necesarias:
# npm install -g imagemin-cli imagemin-webp imagemin-pngquant imagemin-mozjpeg

echo "🚀 Optimizando imágenes..."

# Crear carpeta de salida optimizada
New-Item -ItemType Directory -Force -Path "public/optimized"

# Optimizar PNGs (reducir hasta 80% del tamaño)
Write-Host "📸 Optimizando archivos PNG..."
imagemin "public/*.png" --out-dir="public/optimized" --plugin=pngquant --plugin.pngquant.quality="65-80"

# Optimizar JPGs 
Write-Host "🖼️ Optimizando archivos JPG..."
imagemin "public/*.jpg" --out-dir="public/optimized" --plugin=mozjpeg --plugin.mozjpeg.quality=80

# Convertir a WebP (formato más eficiente)
Write-Host "⚡ Convirtiendo a WebP..."
imagemin "public/*.{png,jpg}" --out-dir="public/optimized" --plugin=webp --plugin.webp.quality=80

Write-Host "✅ ¡Optimización completada!"
Write-Host "📊 Revisa la carpeta public/optimized para ver los resultados"
Write-Host ""
Write-Host "🔧 Para el GIF grande (BOXER.gif):"
Write-Host "   - Considera reducir el tamaño de frame"
Write-Host "   - Reduce la cantidad de colores" 
Write-Host "   - Usa herramientas como ezgif.com o GIMP"
Write-Host ""
Write-Host "💡 Próximos pasos:"
Write-Host "   1. Reemplaza los archivos originales con los optimizados"
Write-Host "   2. Usa formato WebP cuando sea posible"
Write-Host "   3. Implementa responsive images para diferentes tamaños"