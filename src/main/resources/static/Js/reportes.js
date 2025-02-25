// Inicialización de un modal de error
let errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
// Array para almacenar los reportes
let reportes = [];

// Llamada a la función para obtener los reportes
getReportes();

// Función para obtener los reportes del servidor
function getReportes() {
    $.get("/reportes", (data) => {
        console.log("Reportes recibidos:", data);
    }).done((data) => {
        // Almacenamos los reportes en el array local
        reportes = data;
        // Llamamos a la función para renderizar los reportes
        renderReportes();
    }).fail((error) => {
        // Mostramos el modal de error si falla la petición
        errorModal.show()
    });
}

// Función para renderizar los reportes en la lista
function renderReportes(filter = "") {
    const reportList = document.getElementById("reportList");
    // Limpiamos la lista de reportes
    reportList.innerHTML = "";

    // Filtramos y renderizamos los reportes que coincidan con el filtro
    reportes
        .filter(reporte => reporte.usuario.username.toLowerCase().includes(filter.toLowerCase()))
        .forEach(reporte => {
            const div = document.createElement("div");
            div.className = "user-item p-1 border-bottom d-flex justify-content-between align-items-center";
            div.style.cursor = "pointer";

            // Creamos un elemento span para mostrar la descripción del reporte
            const descripcion = document.createElement("span");
            descripcion.textContent = reporte.descripcion;

            // Creamos un botón para eliminar el reporte
            const btnEliminar = document.createElement("button");
            btnEliminar.className = "btn btn-danger btn-sm";
            btnEliminar.textContent = "Eliminar";
            btnEliminar.setAttribute("data-id", reporte.id); // Guardamos el ID en un atributo

            // Añadimos los elementos al div
            div.appendChild(descripcion);
            div.appendChild(btnEliminar);
            reportList.appendChild(div);
        });
}

// Delegación de eventos para eliminar reportes
document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("btn-danger")) {
        const id = e.target.getAttribute("data-id");
        eliminarReporte(id);
    }
});

// Función para eliminar un reporte del servidor
function eliminarReporte(id) {
    console.log("Eliminando reporte con ID:", id);

    $.get(`/deleteReporte/${id}`)
        .done(() => {
            console.log("Reporte eliminado correctamente");
            // Eliminamos el reporte del array local
            reportes = reportes.filter(reporte => reporte.id !== id);
            // Redireccionamos a la página de administrador
            window.location.href = "/administrador.html";
        })
        .fail(() => {
            console.error("Error al eliminar el reporte");
        });
}