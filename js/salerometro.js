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
    { porcentaje: "100% Salado", mensaje: "¡Estás más salado que el chamoy en pleno verano!" },
    { porcentaje: "90% Salado", mensaje: "Si la mala suerte fuera un deporte, ya tendrías medalla de oro." },
    { porcentaje: "80% Salado", mensaje: "Si llueve sopa, seguro te cae un tenedor en la cabeza." },
    { porcentaje: "70% Salado", mensaje: "Tu horóscopo dice: 'Hoy no salgas de casa… ni mañana tampoco'." },
    { porcentaje: "60% Salado", mensaje: "Tu suerte es como el wifi en la plaza pública: inestable y decepcionante." },
    { porcentaje: "50% Salado", mensaje: "Ni suerte ni desgracia… pero mejor no juegues apuestas." },
    { porcentaje: "40% Salado", mensaje: "Casi en la zona segura, pero si compras un billete de lotería, mejor guárdalo de recuerdo." },
    { porcentaje: "30% Salado", mensaje: "Tienes el toque justo de sal, como unas buenas papas fritas." },
    { porcentaje: "20% Salado", mensaje: "Tu suerte va mejorando, pero todavía no es momento de tentar al destino." },
    { porcentaje: "10% Salado", mensaje: "Eres más fresco que una brisa en la playa, ¡disfruta tu buena racha!" },
    { porcentaje: "5% Salado", mensaje: "Tu suerte es casi perfecta, ¡ve y compra un boleto de lotería!" },
    { porcentaje: "1% Salado", mensaje: "Casi puro, pero nunca está de más un amuleto por si acaso." },
    { porcentaje: "0% Salado", mensaje: "¡Eres más dulce que el algodón de azúcar, la suerte te sonríe!" }
];

// Escuchar cambios en el input de la cámara
document.getElementById("camera-input").addEventListener("change", function (event) {
    let file = event.target.files[0];

    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
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

// Crear objetos de audio
const sonidoAnalisis = new Audio("sounds/analisis.mp3");
const sonidoResultado = new Audio("sounds/resultado.mp3");


function iniciarAnalisis() {
    document.getElementById("overlay").style.display = "flex";

    let progressBar = document.getElementById("progress-bar");
    let progressMessage = document.getElementById("progress-message");
    let resultMessage = document.getElementById("result-message");

    let progress = 0;
    let phraseIndex = 0;

    if ("vibrate" in navigator) {
        navigator.vibrate([500, 300, 500]); // Vibración: 500ms, pausa 300ms, 500ms
    }

    let interval = setInterval(() => {
        progress += 6.67;
        progressBar.value = progress;

        if (phraseIndex < frasesAnalisis.length) {
            progressMessage.textContent = frasesAnalisis[phraseIndex++];
            sonidoAnalisis.play();

        }

        if (progress >= 100) {
            clearInterval(interval);
            let finalResult = getFinalResult();
            resultMessage.innerHTML = `
                <span class="porcentaje">${finalResult.porcentaje}</span><br>
                <span class="mensaje">${finalResult.mensaje}</span><br>
                <button id="reiniciar-btn">↻ Reiniciar</button>
                <button id="compartir-btn">📤 Compartir en WhatsApp</button>
            `;
            resultMessage.style.display = "block";
            sonidoResultado.play();

            // Agregar evento al botón de reinicio
            document.getElementById("reiniciar-btn").addEventListener("click", function () {
                location.reload();
            });
            // Agregar evento al botón de compartir
            document.getElementById("compartir-btn").addEventListener("click", function () {
                let textoCompartir = `🔥 ¡Descubrí mi nivel de sal en el #Salerómetro! 🔮\n\n` +
                    `Resultado: ${finalResult.porcentaje} 🌊\n` +
                    `"${finalResult.mensaje}"\n\n` +
                    `¿Te atreves a probarlo? 😏`;

                let url = `https://wa.me/?text=${encodeURIComponent(textoCompartir)}`;
                window.open(url, "_blank");
            });

        }
    }, 1500);
}

function getFinalResult() {
    return frasesFinales[Math.floor(Math.random() * frasesFinales.length)];
}
