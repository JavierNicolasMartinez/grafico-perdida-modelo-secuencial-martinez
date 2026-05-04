// Configuración
const TOTAL_EPOCHS = 350;

// Arreglo para guardar el valor de pérdida en cada época
const lossValues = [];

// Elementos del DOM
const statusDot = document.getElementById('status-dot');
const chartPanel = document.getElementById('chart-panel');
const lossChartCtx = document.getElementById('loss-chart').getContext('2d');
const statusText = document.getElementById('status-text');
const epochInfo = document.getElementById('epoch-info');
const progressBar = document.getElementById('progress');
const predictionPanel = document.getElementById('prediction-panel');
const xInput = document.getElementById('x-input');
const predictBtn = document.getElementById('predict-btn');
const resultContainer = document.getElementById('result-container');
const resultValue = document.getElementById('result-value');

// Inicializar y entrenar el modelo
async function run() {
    // 1. Crear el modelo secuencial
    const model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [1]}));

    // 2. Preparar el modelo para el entrenamiento
    model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

    // 3. Generar datos sintéticos para el entrenamiento (y = 2x + 6)
    // Valores de X: Desde -6 con 9 valores en total (-6, -5, -4, -3, -2, -1, 0, 1, 2)
    const xsData = [-6, -5, -4, -3, -2, -1, 0, 1, 2];
    const ysData = xsData.map(x => 2 * x + 6);
    
    // Forma [9, 1] requerida
    const xs = tf.tensor2d(xsData, [9, 1]);
    const ys = tf.tensor2d(ysData, [9, 1]);

    // 4. Entrenar el modelo
    await model.fit(xs, ys, {
        epochs: TOTAL_EPOCHS,
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                // Actualizar interfaz durante el entrenamiento
                const currentEpoch = epoch + 1;
                epochInfo.innerText = `Época: ${currentEpoch} / ${TOTAL_EPOCHS}`;
                
                const progressPercentage = (currentEpoch / TOTAL_EPOCHS) * 100;
                progressBar.style.width = `${progressPercentage}%`;
                
                // Guardar valor de pérdida
                lossValues.push(logs.loss);
                
                // Imprimir log cada 50 épocas para debug
                if (currentEpoch % 50 === 0 || currentEpoch === TOTAL_EPOCHS) {
                    console.log(`Epoch ${currentEpoch}: loss = ${logs.loss}`);
                }
            }
        }
    });

    // 5. Entrenamiento finalizado
    trainingComplete();

    // 6. Configurar evento de predicción
    setupPrediction(model);
}

function trainingComplete() {
    // Cambiar estado visual
    statusDot.classList.remove('training');
    statusDot.classList.add('ready');
    statusText.innerText = 'Modelo Listo';
    statusText.style.color = 'var(--success)';
    epochInfo.innerText = `Entrenamiento finalizado (${TOTAL_EPOCHS} épocas)`;
    
    // Mostrar panel de predicción y gráfica
    predictionPanel.classList.remove('hidden');
    chartPanel.classList.remove('hidden');
    
    // Graficar pérdida
    renderChart();
    
    // Habilitar controles
    xInput.disabled = false;
    predictBtn.disabled = false;
    xInput.focus();
}

function setupPrediction(model) {
    predictBtn.addEventListener('click', () => {
        const xValue = parseFloat(xInput.value);
        
        if (isNaN(xValue)) {
            alert('Por favor, ingresa un número válido para X.');
            return;
        }

        // Realizar inferencia con el valor de X, de forma [1, 1]
        const output = model.predict(tf.tensor2d([xValue], [1, 1]));
        const prediction = output.dataSync()[0];
        
        // Mostrar resultado
        resultContainer.classList.remove('hidden');
        
        // Efecto de animación para el número
        animateValue(resultValue, prediction, 1000);
    });

    // Permitir predecir al presionar Enter
    xInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !predictBtn.disabled) {
            predictBtn.click();
        }
    });
}

// Función auxiliar para animar el número del resultado
function animateValue(obj, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Usar una función de easing (easeOutQuart) para suavizar
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const currentVal = end * easeProgress;
        
        obj.innerHTML = currentVal.toFixed(2);
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerHTML = end.toFixed(2); // Asegurar el valor final
        }
    };
    window.requestAnimationFrame(step);
}

function renderChart() {
    new Chart(lossChartCtx, {
        type: 'line',
        data: {
            labels: Array.from({length: TOTAL_EPOCHS}, (_, i) => i + 1),
            datasets: [{
                label: 'Pérdida (Loss)',
                data: lossValues,
                borderColor: '#8b5cf6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                borderWidth: 2,
                pointRadius: 0,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: { color: '#f8fafc' }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Época', color: '#cbd5e1' },
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                },
                y: {
                    title: { display: true, text: 'Valor de Pérdida', color: '#cbd5e1' },
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                }
            }
        }
    });
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', run);
