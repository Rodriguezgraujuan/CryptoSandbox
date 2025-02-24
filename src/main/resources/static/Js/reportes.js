let errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
let reportes = [];

getReportes();

function getReportes() {
    $.get("/reportes", (data) => {
        console.log("Reportes recibidos:", data);
    }).done((data) => {
        reportes = data;
        renderReportes();
    }).fail((error) => {
        errorModal.show()
    });
}

function renderReportes(filter = "") {
    const reportList = document.getElementById("reportList");
    reportList.innerHTML = "";

    reportes
        .filter(reporte => reporte.usuario.username.toLowerCase().includes(filter.toLowerCase()))
        .forEach(reporte => {
            const div = document.createElement("div");
            div.className = "user-item p-1 border-bottom d-flex justify-content-between align-items-center";
            div.style.cursor = "pointer";

            // Texto del reporte
            const descripcion = document.createElement("span");
            descripcion.textContent = reporte.descripcion;

            // Botón de eliminar
            const btnEliminar = document.createElement("button");
            btnEliminar.className = "btn btn-danger btn-sm";
            btnEliminar.textContent = "Eliminar";
            btnEliminar.setAttribute("data-id", reporte.id); // Guardamos el ID en un atributo

            // Agregar elementos al div
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

function eliminarReporte(id) {
    console.log("Eliminando reporte con ID:", id);

    $.get(`/deleteReporte/${id}`)
        .done(() => {
            console.log("Reporte eliminado correctamente");
            reportes = reportes.filter(reporte => reporte.id !== id); // Eliminar del array local
            window.location.href = "/administrador.html";
        })
        .fail(() => {
            console.error("Error al eliminar el reporte");
        });
}