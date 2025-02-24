document.addEventListener("DOMContentLoaded", function () {
    const toggleThemeBtn = document.getElementById("toggle-theme");
    const body = document.body;

    // Verificar si hay un tema guardado en el almacenamiento local
    if (localStorage.getItem("theme") === "dark") {
        setDarkMode();
    } else {
        setLightMode();
    }

    toggleThemeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (body.classList.contains("dark-mode")) {
            setLightMode();
        } else {
            setDarkMode();
        }
    });

    function setDarkMode() {
        body.classList.add("dark-mode");
        body.style.backgroundColor = "#121212";
        body.style.color = "#ffffff";
        document.querySelectorAll(".navbar, footer").forEach(el => {
            el.style.backgroundColor = "#222";
        });
        document.querySelectorAll(".list-group-item").forEach(el => {
            el.style.backgroundColor = "#333";
            el.style.color = "#ffffff";
        });
        document.querySelectorAll(".nav-link").forEach(el => {
            el.style.color = "white";
        });
        document.querySelectorAll(".quantity-crypto").forEach(el => {
            el.style.color = "#ffc107";
        });
        document.getElementById("navMenu").classList.remove("navbar-light");
        document.getElementById("navMenu").classList.add("navbar-dark");

        toggleThemeBtn.textContent = "Modo Claro";
        localStorage.setItem("theme", "dark");
    }

    function setLightMode() {
        body.classList.remove("dark-mode");
        body.style.backgroundColor = "#ffffff";
        body.style.color = "#000000";
        document.querySelectorAll(".navbar, footer").forEach(el => {
            el.style.backgroundColor = "#F0F0F0";
        });
        document.querySelectorAll(".list-group-item").forEach(el => {
            el.style.backgroundColor = "#ffffff";
            el.style.color = "#000000";
        });
        document.querySelectorAll(".nav-link").forEach(el => {
            el.style.color = "black";
        });

        document.querySelectorAll(".quantity-crypto").forEach(el => {
            el.style.color = "#000000";
        });

        document.getElementById("navMenu").classList.add("navbar-light");
        document.getElementById("navMenu").classList.remove("navbar-dark");

        toggleThemeBtn.textContent = "Modo Oscuro";
        localStorage.setItem("theme", "light");
    }
});

