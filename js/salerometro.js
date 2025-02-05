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
    "Realizando un ajuste final en las vibraciones salinas....",
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

let fotoTomada = false;

function mostrarResultado(sal) {
    let resultado = document.getElementById('resultado');
    let finalResult = getFinalResult();
    resultado.innerHTML = `
        <span class="porcentaje">${finalResult.porcentaje}</span><br>
        <span class="mensaje">${finalResult.mensaje}</span>
    `;
    
}

document.getElementById("take-photo-btn").addEventListener("click", async function() {
    // Abrir la cámara del dispositivo
    let stream = await navigator.mediaDevices.getUserMedia({ video: true });
    let video = document.createElement('video');
    video.srcObject = stream;
    video.play();

    // Crear un canvas para tomar la foto
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    // Después de unos segundos, tomar la foto
    setTimeout(() => {
        // Dibujar la imagen en el canvas
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Detener la cámara
        stream.getTracks().forEach(track => track.stop());

        // Mostrar la foto en la página
        let photo = document.getElementById("photo");
        photo.src = canvas.toDataURL();
        photo.style.display = "block"; // Hacer visible la foto

        // Iniciar análisis después de 2 segundos
        setTimeout(() => {
            iniciarAnalisis();
        }, 2000);
    }, 2000);
});

function iniciarAnalisis() {
    // Mostrar el overlay con la barra de progreso
    document.getElementById("overlay").style.display = "flex";

    let progressBar = document.getElementById("progress-bar");
    let progressMessage = document.getElementById("progress-message");
    let resultMessage = document.getElementById("result-message");

    let progress = 0;
    let phraseIndex = 0; // Variable para cambiar las frases de análisis

    // Actualizar el mensaje de progreso cada 1.5 segundos (para que dure 15 segundos en total)
    let interval = setInterval(() => {
        progress += 6.67; // Para que dure 15 segundos, incrementa cada 1.5 segundos (100 / 15 = 6.67)
        progressBar.value = progress;

        // Mostrar las frases de análisis durante el progreso
        if (phraseIndex < frasesAnalisis.length) {
            progressMessage.textContent = frasesAnalisis[phraseIndex++];
        }

        // Cuando el progreso llega al 100%, finalizar y mostrar el resultado
        if (progress >= 100) {
            clearInterval(interval);
            let finalResult = getFinalResult(progress); // Obtener resultado final
            resultMessage.innerHTML = `
                <span class="porcentaje">${finalResult.porcentaje}</span><br>
                <span class="mensaje">${finalResult.mensaje}</span>
            `;
            resultMessage.style.display = "block"; // Mostrar el resultado

            // Mostrar el botón de reiniciar
            document.getElementById("reiniciar-btn").style.display = "block";
        }
    }, 1500); // Cada 1.5 segundos incrementa el progreso
}

// Función para obtener el resultado final basado en el porcentaje
function getFinalResult() {
    // Seleccionar un resultado aleatorio de frasesFinales
    let resultadoAleatorio = frasesFinales[Math.floor(Math.random() * frasesFinales.length)];
    return resultadoAleatorio;
}

// Evento para reiniciar la página
document.getElementById("reiniciar-btn").addEventListener("click", function() {
    location.reload(); // Recarga la página
});
