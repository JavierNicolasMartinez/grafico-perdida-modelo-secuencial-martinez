# T.P Graficar Perdida en el Modelo Secuencial

Este proyecto es una actualización de la aplicación web interactiva que entrena un modelo de Machine Learning en el navegador utilizando **TensorFlow.js**. El objetivo original del modelo era aprender a predecir la función matemática lineal $y = 2x + 6$. 

En este trabajo práctico, se ha implementado una mejora visual y analítica fundamental: **la graficación de la función de pérdida (loss) a lo largo de las épocas de entrenamiento.**

## 📊 Novedades en esta versión

### Gráfica de Evolución de la Pérdida
Para comprender cómo el modelo aprende y reduce su error con el paso del tiempo, se ha integrado una visualización interactiva:
- **Librería utilizada:** `Chart.js` (cargada mediante CDN por ser muy simple para gráficos en web y brindar un excelente resultado visual, además de ser altamente personalizable).
- **Eje X:** Representa las Épocas de entrenamiento (del 1 al 350).
- **Eje Y:** Representa el valor de la pérdida (loss) en esa época específica.
- **Comportamiento:** La gráfica se dibuja una vez que el modelo finaliza su entrenamiento, mostrando claramente una curva decreciente. En las primeras épocas (ej: Epoch 1) la pérdida es muy alta, y a medida que el modelo ajusta sus pesos hacia las últimas épocas (ej: Epoch 350), la pérdida decrece a valores muy cercanos a cero, demostrando el éxito del aprendizaje.

### Detalles de la Implementación
1. **Captura de Datos:** Se hizo uso del callback `onEpochEnd` dentro de las opciones de `model.fit`. En cada época finalizada, el valor `logs.loss` fue capturado y guardado en un arreglo de JavaScript (`lossValues`).
2. **Estructura HTML:** Se incorporó una nueva sección con la etiqueta `<canvas>` en `index.html` dedicada a renderizar el gráfico.
3. **Renderizado (Chart.js):** Al completar todas las épocas, se llama a la función `renderChart()`, la cual instancia un gráfico de línea (`type: 'line'`) y dibuja los datos mapeando los índices como etiquetas del eje X y los valores de pérdida en el eje Y.

## 🚀 Características Generales
- Entrenamiento de una red neuronal densa (`inputShape: [1]`) completamente en el navegador.
- Visualización de la curva de aprendizaje (Pérdida vs Épocas).
- Predicción dinámica de `Y` al ingresar un valor de `X` tras finalizar el entrenamiento.
- Interfaz de usuario moderna y premium con diseño Glassmorphism y animaciones.

## 🛠️ Tecnologías Utilizadas
- **HTML5 & CSS3**
- **JavaScript (ES6)**
- **TensorFlow.js** (Modelo secuencial predictivo)
- **Chart.js** (Visualización analítica)

## 📥 Ejecutar el Proyecto
Ya que el proyecto utiliza tecnologías web estándar y CDNs, no requiere instalaciones complejas.

1. Clona el repositorio:
   ```bash
   git clone https://github.com/JavierNicolasMartinez/grafico-perdida-modelo-secuencial-martinez.git
   ```
2. Accede a la carpeta:
   ```bash
   cd grafico-perdida-modelo-secuencial-martinez
   ```
3. Ejecuta el archivo `index.html` a través de **Live Server** en Visual Studio Code, o levanta un servidor rápido de Python:
   ```bash
   python -m http.server
   ```
   Y abre tu navegador en `http://localhost:8000`.

---
**Autor:** Javier Nicolás Martínez  
**Institución:** Instituto Politécnico Formosa
