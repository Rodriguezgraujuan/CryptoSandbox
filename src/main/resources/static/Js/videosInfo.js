document.addEventListener("DOMContentLoaded", function () {
    // Selecciona los enlaces de video, el elemento de video, el source del video, y los elementos para el título y descripción
    const videoLinks = document.querySelectorAll("aside .collapse .nav-link");
    const videoElement = document.querySelector("video");
    const sourceElement = document.getElementById("video");
    const tituloVideo = document.getElementById("tituloVideo");
    const descripcionVideo = document.getElementById("descripcionVideo");

    // Define un objeto con los datos de cada video (título, descripción y URL)
    const videosData = {
        "Video 1: Bienvenida": {
            title: "1. Bienvenida a CryptoSandBox",
            description: "Descubre qué es CryptoSandBox y cómo te puede ayudar.",
            url: "videos/Bienvenida.mp4"
        },
        "Video 2: ¿Qué es CriptoSandBox?": {
            title: "2. ¿Qué es CriptoSandBox?",
            description: "Aprende qué es CryptoSandBox y cómo funciona.",
            url: "videos/QueEsCryptoSandBox.mp4"
        },
        "Video 3: Guia de la web": {
            title: "3. Compra y vende criptomonedas",
            description: "Aprende a comprar y vender criptomonedas de forma segura.",
            url: "videos/GuiaWEB.mp4"
        },
        "Video 4: Transacciones de criptomonedas": {
            title: "4. Intercambia criptomonedas",
            description: "Guía para realizar intercambios entre diferentes criptos.",
            url: "videos/Transacciones.mp4"
        },
        "Video 5: Entiende las graficas": {
            title: "5. Entiende las gráficas",
            description: "Analiza gráficos de precios y toma mejores decisiones.",
            url: "videos/Graficas.mp4"
        },
        "Video 6: Cuando comprar y vender": {
            title: "6. ¿Cuándo comprar y vender?",
            description: "Aprende estrategias para saber cuándo entrar y salir del mercado.",
            url: "videos/ComprarVender.mp4"
        },
        "Video 7: No siempre se gana": {
            title: "7. No siempre se gana",
            description: "Consejos para manejar pérdidas y gestionar riesgos.",
            url: "videos/Riesgos.mp4"
        }
    };

    // Itera sobre cada enlace de video y añade un evento de click
    videoLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const videoKey = this.textContent.trim();  // Obtiene el texto del enlace

            // Verifica si existe el video en los datos
            if (videosData[videoKey]) {
                // Actualiza el título, la descripción y la URL del video
                tituloVideo.textContent = videosData[videoKey].title;
                descripcionVideo.textContent = videosData[videoKey].description;
                sourceElement.src = videosData[videoKey].url;

                // Carga el nuevo video
                videoElement.load(); // Carga el nuevo video

                // Muestra en consola el cambio de video
                console.log(`Cambiando a: ${videosData[videoKey].title}`);
            } else {
                // Si no se encuentra el video, muestra una advertencia en la consola
                console.warn(`No se encontró el video para: "${videoKey}"`);
            }
        });
    });
});
