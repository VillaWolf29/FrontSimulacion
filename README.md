```markdown
# MS4M - Visualizador de Simulación (Frontend)

**Autor:** Juan Alberto Villalobos Melendez (@VillaWolf29)

Este repositorio contiene la interfaz de usuario desarrollada en **React + Vite** y **Leaflet** para la evaluación técnica de MS4M. Permite visualizar la red vial, iniciar la simulación y observar el recorrido de los camiones en tiempo real.

## 🔗 Enlaces Importantes
* **Despliegue (Vercel):** https://[tu-proyecto-en-vercel].vercel.app
* **Repositorio GitHub Backend:** https://github.com/VillaWolf29/BackSimulacion

## 🚀 Instrucciones de Ejecución Local

1. Asegúrate de tener **Node.js** instalado.
2. Clona este repositorio y abre una terminal en la carpeta raíz (`FrontSimulacion`).
3. Instala las dependencias:
   ```bash
   npm install


1. Levanta el servidor de desarrollo:
   
   Bash
   npm run dev

2. Nota Importante: Este frontend consume la API en http://localhost:8081. Asegúrate de tener el backend de Spring Boot ejecutándose en ese puerto antes de iniciar la simulación.

Respuestas a la Evaluación
Frontend y Visualización
Se utilizó React estructurado en componentes funcionales junto con react-leaflet para la renderización del mapa. Se implementó una jerarquía visual clara: polilíneas para las rutas (respetando sus colores originales), y marcadores diferenciados para zonas de carga (verde), descarga (rojo) y camiones (amarillo), acompañados de una leyenda flotante.
Alternativas: Se evaluó utilizar MapLibre GL JS o Google Maps API.
Mejor opción con más tiempo: Si tuviera más tiempo, separaría el código en múltiples sub-componentes modulares (ej. ControlPanel, MapLegend, ReportTable) en lugar de centralizarlo. Además, agregaría animaciones fluidas con CSS puro para el movimiento de los camiones entre los intervalos de polling para suavizar la transición visual, y utilizaría MapLibre por su mejor rendimiento al renderizar vectores mediante WebGL.

```text
Estimado equipo de evaluación de MS4M,

Adjunto los enlaces y la información correspondiente a la solución desarrollada para la Evaluación de Conocimientos - Ingeniero de Desarrollo de Software (GTH-FOR-03).

1. URL del Repositorio Git: https://github.com/VillaWolf29/BackSimulacion (Backend) y https://github.com/VillaWolf29/FrontSimulacion (Frontend)
2. URL pública del Frontend en Vercel: https://[tu-proyecto-en-vercel].vercel.app
3. URL del Backend: Se adjuntan instrucciones para ejecución local en http://localhost:8081 
4. Instrucciones de ejecución local: Detalladas paso a paso en el archivo README.md de cada repositorio.
5. Documentación de API y decisiones técnicas:
   - Contrato OpenAPI/Swagger: http://localhost:8081/swagger-ui/index.html
   - Explicación de arquitectura, algoritmos (Dijkstra, Polling, Interpolación) y respuestas a las 5 preguntas del alcance funcional incluidas en los README.md.

Atentamente,
Juan Alberto Villalobos Melendez