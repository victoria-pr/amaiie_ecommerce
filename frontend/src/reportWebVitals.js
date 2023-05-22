//Funciones para medir y registrar métricas de rendimiento web:
//Tiempo de carga de contenido visible (CLS)
//Retraso de la primera interacción (FID)
//Tiempo hasta el primer contenido pintado (FCP)
//Tiempo hasta el mayor contenido pintado (LCP)
//Tiempo hasta el primer byte (TTFB)

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
