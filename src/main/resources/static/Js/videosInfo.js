document.addEventListener("DOMContentLoaded", function () {
    const videoLinks = document.querySelectorAll("aside .collapse .nav-link");
    const videoElement = document.querySelector("video");
    const sourceElement = document.getElementById("video");
    const trackElement = document.getElementById("subtitlesTrack");
    const tituloVideo = document.getElementById("tituloVideo");
    const descripcionVideo = document.getElementById("descripcionVideo");

    const videosData = {
        "Video 1: Bienvenida": {
            title: "1. Bienvenida a CryptoSandBox",
            description: "Descubre qué es CryptoSandBox y cómo te puede ayudar.",
            url: "videos/presentacion.mp4",
            tracks: "videos/presentacion_subtitulos.vtt"

        },
        "Video 2: ¿Qué es CriptoSandBox?": {
            title: "2. ¿Qué es CriptoSandBox?",
            description: "Aprende qué es CryptoSandBox y cómo funciona.",
            url: "videos/QueEsCryptoSandBox.mp4"
        },
        "Video 3: Guia de la web": {
            title: "3. Guía de la web",
            description: "Aprende a navegar por la plataforma CryptoSandBox.",
            url: "videos/GuiaWEB.mp4",
            tracks: "videos/GuiaWEB.vtt"
        },
        "Video 4: Transacciones de criptomonedas": {
            title: "4. Transacciones de criptomonedas",
            description: "Guía para realizar transacciones en CryptoSandBox.",
            url: "videos/Transacciones.mp4",
            tracks: "videos/Transacciones.vtt"
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

    videoLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const videoKey = this.textContent.trim();

            if (videosData[videoKey]) {
                tituloVideo.textContent = videosData[videoKey].title;
                descripcionVideo.textContent = videosData[videoKey].description;
                sourceElement.src = videosData[videoKey].url;

                // Actualizar subtítulos si están disponibles
                if (videosData[videoKey].tracks) {
                    trackElement.src = videosData[videoKey].tracks;
                    trackElement.setAttribute('default', 'true');
                } else {
                    trackElement.removeAttribute('src');
                    trackElement.removeAttribute('default');
                }

                videoElement.load(); // Cargar el nuevo video
                console.log(`Cambiando a: ${videosData[videoKey].title}`);
            } else {
                console.warn(`No se encontró el video para: "${videoKey}"`);
            }
        });
    });
});