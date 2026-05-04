# Guía para Exposición: Modelo Secuencial con Gráfica de Pérdida

Esta guía está estructurada para que puedas explicar paso a paso la evolución de tu proyecto, desde la base inicial hasta las mejoras implementadas en este nuevo Trabajo Práctico.

---

## 1. Contexto del Proyecto Inicial (Lo que ya tenías)
En la primera etapa, desarrollamos una aplicación de Inteligencia Artificial que corre íntegramente en el navegador.

*   **Objetivo Matemático:** El modelo debía aprender la función lineal **y = 2x + 6**.
*   **Arquitectura del Modelo:**
    *   Utilizamos **TensorFlow.js** (la librería de Google para ML en JS).
    *   Es un **Modelo Secuencial** simple con una capa densa (neurona única).
*   **Datos de Entrenamiento:**
    *   Entrenamos con **9 muestras** de datos (X desde -6 hasta 2).
    *   Configuramos el entrenamiento para **350 épocas** (iteraciones).
*   **Interfaz de Usuario (UI):**
    *   Diseño **Glassmorphism** (efecto de cristal esmerilado).
    *   Feedback en tiempo real: Una barra de progreso y un indicador de estado que muestra el avance de las épocas.
    *   Módulo de Predicción: Una vez entrenado, permite ingresar un valor `X` para obtener el resultado `Y` calculado por la red neuronal.

---

## 2. Nuevas Mejoras Implementadas (Lo nuevo de este TP)
El objetivo de esta entrega fue añadir **capacidad analítica** al modelo para visualizar su aprendizaje.

### A. Monitoreo de la Función de Pérdida (Loss)
*   **¿Qué es la pérdida?** Es el valor que indica qué tan "equivocado" está el modelo. Al principio es alto y debe bajar a medida que el modelo aprende.
*   **Implementación Técnica:** Usamos el callback `onEpochEnd`. Esto significa que cada vez que termina una época, el modelo nos "avisa" y nos entrega el valor actual de la pérdida.
*   **Almacenamiento:** Creamos un arreglo en JavaScript para guardar esos 350 valores y poder graficarlos después.

### B. Visualización con Chart.js
*   **Librería:** Integramos **Chart.js** vía CDN. Es una de las librerías más potentes y ligeras para gráficas en web.
*   **La Gráfica:** Al finalizar el entrenamiento, el sistema genera automáticamente una gráfica de línea.
    *   **Eje X:** Representa el tiempo (Épocas).
    *   **Eje Y:** Representa el error (Loss).
*   **Resultado Visual:** Se observa una curva descendente clara, lo que demuestra científicamente que el modelo está optimizando sus pesos correctamente.

### C. Gestión Profesional del Código
*   **Repositorio:** Se migró todo el código a un nuevo repositorio específico para este TP: `grafico-perdida-modelo-secuencial-martinez`.
*   **Despliegue:** El proyecto está preparado para ser publicado en **GitHub Pages**, permitiendo que cualquier persona con el link pueda probar el modelo sin instalar nada.

---

## 3. Resumen para cerrar la exposición
> *"En conclusión, pasamos de tener un modelo que simplemente predecía un resultado, a tener una herramienta de análisis completa que nos permite ver cómo la Inteligencia Artificial va reduciendo su error paso a paso a través de las 350 épocas de entrenamiento."*

---
**Autor:** Javier Nicolás Martínez
**Tecnologías:** TensorFlow.js, Chart.js, HTML5, CSS3 (Glassmorphism).
