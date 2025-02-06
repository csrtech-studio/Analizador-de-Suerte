const frasesAnalisis = [
    "Iniciando revisión de sal en el cuerpo...",
    "Escaneando cada centímetro...",
    "Analizando cada átomo...",
    "Revisando niveles de salinidad...",
    "Midiendo vibraciones saladas...",
    "Buscando residuos de mala suerte...",
    "Detectando influencia cósmica...",
    "Comparando con niveles oceánicos...",
    "Verificando compatibilidad con la buena suerte...",
    "Calculando el nivel de sal universal...",
    "Sintonizando con las energías del mar...",
    "Evaluando el impacto de tus decisiones saladas...",
    "Realizando un ajuste final en las vibraciones salinas...",
    "Análisis Completo."
];

const frasesFinales = [
    { porcentaje: "100%", mensaje: "Estás más salado que el chamoy." },
    { porcentaje: "90%", mensaje: "Cuidado, podrías ser el próximo snack salado." },
    { porcentaje: "80%", mensaje: "Pareces haber pasado demasiado tiempo en la playa." },
    { porcentaje: "70%", mensaje: "No olvides hidratarte, ¡estás a punto de ser un snack salado!" },
    { porcentaje: "60%", mensaje: "Prueba con un poco de agua... y suerte en la lotería." },
    { porcentaje: "50%", mensaje: "Nivel bajo, pero todavía puedes brillar en la vida." },
    { porcentaje: "40%", mensaje: "Estás casi en la zona de seguridad, ¡prueba con un poco de suerte!" },
    { porcentaje: "30%", mensaje: "Perfecto para un toque de sazón, pero sin excederte." },
    { porcentaje: "20%", mensaje: "Parece que has tenido un día tranquilo, ¡felicidades!" },
    { porcentaje: "10%", mensaje: "Tan suave como una brisa fresca. ¡Nada de malas vibras aquí!" },
    { porcentaje: "5%", mensaje: "Nivel bajo, prueba comprando un billete de lotería." },
    { porcentaje: "1%", mensaje: "Estás casi puro, pero nunca está de más una pizca extra." },
    { porcentaje: "0%", mensaje: "¡Eres más dulce que un caramelo, pero sin suerte en este análisis!" }
];

// Escuchar cambios en el input de la cámara
document.getElementById("camera-input").addEventListener("change", function(event) {
    let file = event.target.files[0];

    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            let photo = document.getElementById("photo");
            photo.src = e.target.result;
            photo.style.display = "block"; // Mostrar la imagen
        };
        reader.readAsDataURL(file);

        // Iniciar análisis después de seleccionar la imagen
        setTimeout(() => {
            iniciarAnalisis();
        }, 2000);
    }
});

function iniciarAnalisis() {
    document.getElementById("overlay").style.display = "flex";

    let progressBar = document.getElementById("progress-bar");
    let progressMessage = document.getElementById("progress-message");
    let resultMessage = document.getElementById("result-message");

    let progress = 0;
    let phraseIndex = 0;

    let interval = setInterval(() => {
        progress += 6.67;
        progressBar.value = progress;

        if (phraseIndex < frasesAnalisis.length) {
            progressMessage.textContent = frasesAnalisis[phraseIndex++];
        }

        if (progress >= 100) {
            clearInterval(interval);
            let finalResult = getFinalResult();
            resultMessage.innerHTML = `
                <span class="porcentaje">${finalResult.porcentaje}</span><br>
                <span class="mensaje">${finalResult.mensaje}</span><br>
                <button id="reiniciar-btn">↻ Reiniciar</button>
            `;
            resultMessage.style.display = "block";

            // Agregar evento al botón de reinicio
            document.getElementById("reiniciar-btn").addEventListener("click", function() {
                location.reload();
            });
        }
    }, 1500);
}

function getFinalResult() {
    return frasesFinales[Math.floor(Math.random() * frasesFinales.length)];
}
