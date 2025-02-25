// Este script se ejecuta cuando el documento HTML ha sido cargado por completo
$(document).ready(function () {
    // Realizamos una solicitud AJAX a la URL "/getWallet"
    $.ajax({
        url: "/getWallet",
        method: "GET",
        dataType: "text" // Leemos la respuesta como texto para evitar parseos automáticos
    })
        .done((data) => {
            // Si la solicitud es exitosa, imprimimos el contenido de la respuesta
            console.log("Contenido de la respuesta:", data);
            try {
                // Intentamos parsear la respuesta como JSON
                const jsonData = JSON.parse(data);
                console.log("JSON parseado:", jsonData);
                // Actualizamos el texto del elemento con id "salary" con el saldo formateado
                $("#salary").text(`Tu saldo es: ${Math.round(jsonData*100)/100}`);
            } catch (e) {
                // Si hay un error al parsear JSON, lo imprimimos en la consola
                console.error("Error al parsear JSON:", e);
            }
        })
        .fail((jqXHR) => {
            // Si la solicitud falla, imprimimos el mensaje de error de la respuesta en la consola
            console.error("Error en la solicitud:", jqXHR.responseText);
        });
})

