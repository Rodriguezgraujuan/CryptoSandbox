$(document).ready(function () {
    $.ajax({
        url: "/user",
        method: "GET",
        dataType: "text" // Lee como texto para evitar parseos automáticos
    })
        .done((data) => {
            console.log("Contenido de la respuesta:", data);
            try {
                const jsonData = JSON.parse(data);
                console.log("JSON parseado:", jsonData);
                $("#username").text(`${jsonData[0]}`);
                $("#email").text(`${jsonData[1]}`);
            } catch (e) {
                console.error("Error al parsear JSON:", e);
            }
        })
        .fail((jqXHR) => {
            console.error("Error en la solicitud:", jqXHR.responseText);
        });
})
