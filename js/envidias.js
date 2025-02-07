
const frasesAnalisis = [
    "Iniciando escaneo de envidias...",
    "Analizando miradas sospechosas...",
    "Midiendo la intensidad de los chismes...",
    "Detectando pensamientos negativos...",
    "Escaneando comentarios a tus espaldas...",
    "Comparando con niveles de toxicidad estándar...",
    "Revisando la influencia del mal de ojo...",
    "Verificando si alguien quiere lo que tienes...",
    "Calculando la fuerza de las malas vibras...",
    "Finalizando análisis de envidias...",
    "Resultados listos."
];

const frasesFinales = [
    { porcentaje: "100% Envidiado", mensaje: "¡Eres la envidia de TODO el barrio! 👀🔥 Mejor cuida tu energía." },
    { porcentaje: "90% Envidiado", mensaje: "Hay más gente pendiente de ti que de su propia vida. 😏" },
    { porcentaje: "80% Envidiado", mensaje: "Si las miradas envidiosas dieran dinero, serías millonario. 💸" },
    { porcentaje: "70% Envidiado", mensaje: "Te observan en silencio… y no es por cariño. 🫣" },
    { porcentaje: "60% Envidiado", mensaje: "Alguien quiere lo que tienes, pero no se atreve a decirlo. 👀" },
    { porcentaje: "50% Envidiado", mensaje: "Un equilibrio entre admiración y envidia. 🤷‍♂️" },
    { porcentaje: "40% Envidiado", mensaje: "Casi seguro, pero uno que otro te tiene en la mira. 🎯" },
    { porcentaje: "30% Envidiado", mensaje: "Más admiración que envidia, vas bien. 😊" },
    { porcentaje: "20% Envidiado", mensaje: "Relajado, casi nadie siente envidia… todavía. 😎" },
    { porcentaje: "10% Envidiado", mensaje: "Eres más querido que envidiado. ¡Buena vibra! ✨" },
    { porcentaje: "5% Envidiado", mensaje: "No hay mal de ojo aquí, ¡puro flow positivo! 🕶️" },
    { porcentaje: "1% Envidiado", mensaje: "¡Ni una pizca de envidia! Eres puro amor. 💕" },
    { porcentaje: "0% Envidiado", mensaje: "¡Cero envidias! La gente solo quiere aprender de ti. 🤗" }
];

const sonidoEscaneo = new Audio("sounds/analisis.mp3");
const sonidoResultado = new Audio("sounds/resultado.mp3");

document.getElementById("iniciar-btn").addEventListener("click", function() {
    iniciarAnalisis();
});

function iniciarAnalisis() {
    document.getElementById("overlay").style.display = "block";
    let progressMessage = document.getElementById("progress-message");
    let aguja = document.getElementById("aguja");
    
    let progress = 0;
    let phraseIndex = 0;
    let nivelEnvidia = Math.floor(Math.random() * 6);
    let angulo = nivelEnvidia * 30 - 90; // -90° a +90°

    if ("vibrate" in navigator) {
        navigator.vibrate([300, 200, 300]);
    }

    sonidoEscaneo.play();

    let interval = setInterval(() => {
        if (phraseIndex < frasesAnalisis.length) {
            progressMessage.textContent = frasesAnalisis[phraseIndex++];
        }

        if (phraseIndex >= frasesAnalisis.length) {
            clearInterval(interval);
            mostrarResultado(nivelEnvidia, angulo);
        }
    }, 1200);
}

function mostrarResultado(nivelEnvidia, angulo) {
    let aguja = document.getElementById("aguja");
    let resultMessage = document.getElementById("result-message");

    document.getElementById("overlay").style.display = "none";
    aguja.style.transform = `rotate(${angulo}deg)`;
    sonidoResultado.play();

    let finalResult = frasesFinales[nivelEnvidia];
    resultMessage.innerHTML = `
        <span class="porcentaje">${finalResult.porcentaje}</span><br>
        <span class="mensaje">${finalResult.mensaje}</span><br>
        <button id="reiniciar-btn">↻ Reiniciar</button>
        <button id="compartir-btn">📤 Compartir en WhatsApp</button>
    `;
    resultMessage.style.display = "block";

    // Reiniciar
    document.getElementById("reiniciar-btn").addEventListener("click", function() {
        location.reload();
    });

    // Compartir
    document.getElementById("compartir-btn").addEventListener("click", function() {
        let textoCompartir = `👀 ¡Mi nivel de envidia es: ${finalResult.porcentaje}! 🔮\n` +
                             `"${finalResult.mensaje}"\n\n` +
                             `¿Te atreves a probarlo? 😏`;

        let url = `https://wa.me/?text=${encodeURIComponent(textoCompartir)}`;
        window.open(url, "_blank");
    });
}
