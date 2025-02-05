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
    let resultadoFrase = frasesFinales[Math.floor(sal / 10)];
    resultado.innerHTML = `
        <span class="porcentaje">${resultadoFrase.porcentaje}</span>
        <span class="mensaje">${resultadoFrase.mensaje}</span>
    `;
}

function tomarFoto() {
    let video = document.getElementById('camera');
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    if (!fotoTomada) {
        // Activar la cámara solo cuando el usuario haga clic en el botón
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
            })
            .catch(err => console.error("No se pudo acceder a la cámara:", err));

        // Mostrar la cámara en el video y permitir al usuario tomar una foto
        video.style.display = 'block';
        canvas.style.display = 'none';
        fotoTomada = true;
    } else {
        // Tomar la foto después de que el usuario hace clic en "Tomar Foto"
        let imagen = document.createElement('img');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        imagen.src = canvas.toDataURL('image/png');
        document.body.appendChild(imagen); // Mostrar la imagen

        // Detener la cámara
        let stream = video.srcObject;
        let tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        video.style.display = 'none'; // Ocultar la cámara

        // Iniciar análisis
        setTimeout(() => {
            // Mostrar el overlay
            document.getElementById('overlay').style.display = 'flex';
            iniciarMedidor(context, canvas);
        }, 1000); // Esperar 1 segundo antes de iniciar el análisis
    }
}

function iniciarMedidor(context, canvas) {
    let progreso = 0;
    let medidor = document.getElementById('medidor');
    let mensaje = document.getElementById('mensaje');
    let resultado = document.getElementById('resultado');
    
    let indexFrase = 0;
    let tiempoTotal = 20000; // 20 segundos
    let intervalos = 10;
    let incremento = tiempoTotal / intervalos; // Cada actualización durará 2 segundos

    let intervalo = setInterval(() => {
        progreso += 10;
        medidor.value = progreso;

        // Actualizar frase de análisis cada 10%
        if (indexFrase < frasesAnalisis.length) {
            mensaje.textContent = frasesAnalisis[indexFrase];
            indexFrase++;
        }

        // Limpiar el canvas y redibujar la foto solo al inicio
        if (progreso === 0) {
            context.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
            context.drawImage(document.getElementById('camera'), 0, 0, canvas.width, canvas.height); // Redibujar la foto
        }

        // Dibujar un fondo transparente para el medidor
        context.fillStyle = "rgba(0, 0, 0, 0.6)";
        context.fillRect(20, canvas.height - 80, 260, 50);

        // Mostrar porcentaje sobre la imagen
        context.fillStyle = "#FFF";
        context.font = "20px Arial";
        context.fillText("Salinidad: " + progreso + "%", 30, canvas.height - 50);

        // Agregar el análisis de texto en el canvas
        context.fillText(mensaje.textContent, 30, 30);

        // Mostrar el resultado al terminar el análisis
        if (progreso >= 100) {
            clearInterval(intervalo);

            // Ocultar la imagen y medidor
            context.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

            // Mostrar solo el porcentaje y resultado
            mostrarResultado(Math.random() * 100); // Mostrar un resultado aleatorio para el porcentaje

            // Después de mostrar el resultado, borrar la imagen y medidor
            setTimeout(() => {
                document.getElementById('overlay').style.display = 'none'; // Ocultar overlay
            }, 1000); // Esperar 1 segundo antes de ocultar
        }
    }, incremento);
}

document.addEventListener("DOMContentLoaded", () => {
    let video = document.getElementById('camera');
    video.style.display = 'none'; // Inicialmente ocultar el video
});
