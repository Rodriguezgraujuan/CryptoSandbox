// Se ejecuta una función cuando el DOM está listo
document.addEventListener("DOMContentLoaded", function () {
    // Obtenemos el botón de cambiar de tema
    const toggleThemeBtn = document.getElementById("toggle-theme");
    // Obtenemos el elemento body
    const body = document.body;

    // Verificamos si hay un tema guardado en el almacenamiento local
    if (localStorage.getItem("theme") === "dark") {
        setDarkMode();
    } else {
        setLightMode();
    }

    // Añadimos un evento al botón para cambiar de tema
    toggleThemeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        // Si el body tiene la clase "dark-mode", cambiamos a tema claro
        if (body.classList.contains("dark-mode")) {
            setLightMode();
        } else {
            // De lo contrario, cambiamos a tema oscuro
            setDarkMode();
        }
    });

    // Función para activar el tema oscuro
    function setDarkMode() {
        body.classList.add("dark-mode"); // Añadimos la clase "dark-mode" al body
        body.style.backgroundColor = "#121212"; // Cambiamos el color de fondo del body
        body.style.color = "#ffffff"; // Cambiamos el color del texto del body
        // Cambiamos el color de fondo y el color del texto de las navbar y footer
        document.querySelectorAll(".navbar, footer").forEach(el => {
            el.style.backgroundColor = "#222";
            el.style.color = "#ffffff";
        });
        // Cambiamos el color de fondo y el color del texto de los elementos de lista
        document.querySelectorAll(".list-group-item").forEach(el => {
            el.style.backgroundColor = "#333";
            el.style.color = "#ffffff";
        });
        // Cambiamos el color del texto de los enlaces de navegación
        document.querySelectorAll(".nav-link").forEach(el => {
            el.style.color = "white";
        });
        // Cambiamos el color del texto de las cantidades de criptomonedas
        document.querySelectorAll(".quantity-crypto").forEach(el => {
            el.style.color = "#ffc107";
        });
        // Quitamos la clase "navbar-light" y añadimos la clase "navbar-dark" a la navbar
        document.getElementById("navMenu").classList.remove("navbar-light");
        document.getElementById("navMenu").classList.add("navbar-dark");

        // Cambiamos el texto del botón de cambiar de tema
        toggleThemeBtn.textContent = "Modo Claro";
        // Guardamos el tema oscuro en el almacenamiento local
        localStorage.setItem("theme", "dark");
    }

    // Función para activar el tema claro
    function setLightMode() {
        body.classList.remove("dark-mode"); // Quitamos la clase "dark-mode" del body
        body.style.backgroundColor = "#ffffff"; // Cambiamos el color de fondo del body
        body.style.color = "#000000"; // Cambiamos el color del texto del body
        // Cambiamos el color de fondo y el color del texto de las navbar y footer
        document.querySelectorAll(".navbar, footer").forEach(el => {
            el.style.backgroundColor = "#F0F0F0";
            el.style.color = "#000000";
        });
        // Cambiamos el color de fondo y el color del texto de los elementos de lista
        document.querySelectorAll(".list-group-item").forEach(el => {
            el.style.backgroundColor = "#ffffff";
            el.style.color = "#000000";
        });
        // Cambiamos el color del texto de los enlaces de navegación
        document.querySelectorAll(".nav-link").forEach(el => {
            el.style.color = "black";
        });
        // Cambiamos el color del texto de las cantidades de criptomonedas
        document.querySelectorAll(".quantity-crypto").forEach(el => {
            el.style.color = "#000000";
        });
        // Añadimos la clase "navbar-light" y quitamos la clase "navbar-dark" a la navbar
        document.getElementById("navMenu").classList.add("navbar-light");
        document.getElementById("navMenu").classList.remove("navbar-dark");

        // Cambiamos el texto del botón de cambiar de tema
        toggleThemeBtn.textContent = "Modo Oscuro";
        // Guardamos el tema claro en el almacenamiento local
        localStorage.setItem("theme", "light");
    }
});

