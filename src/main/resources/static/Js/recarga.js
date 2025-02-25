// Inicialización del modal de error
let errorModal = new bootstrap.Modal(document.getElementById('errorModal'));

// Obtención de elementos HTML para mostrar mensajes de error
let mensaje = document.getElementById("mensaje");
let contenedorMensaje = document.getElementById("conenedor-mensaje");
let menajeDetallado = document.getElementById("menaje-detallado");
let botonCerrar = document.getElementById("cerrar");

// Evento al enviar el formulario de agregar saldo
$('#cashForm').on('submit', function(e) {
    e.preventDefault(); // Previene la acción por defecto del formulario
    console.log("Dentro de agregar saldo")

    // Obtención del valor del saldo a agregar
    let amount = $("#inputCash").val();

    // Creación de un objeto wallet con el saldo
    let wallet = {
        balance: amount
    };

    // Validación del saldo a agregar
    if (amount > 0) {
        $.ajax({
            url: '/addcash', // URL de la API para agregar saldo
            type: 'POST',
            contentType: 'application/json', // Tipo de contenido
            data: JSON.stringify(wallet), // Convertimos el objeto a JSON
            success: function () {
                // Llamada a la función para obtener un video de anuncio
                obtenerVideoAnuncio();
            },
            error: function (xhr, status, error) {
                // Manejo de errores en la llamada AJAX
                console.log('Error:', error);
                console.log('Estado de la respuesta:', status);
                console.log('Detalles de la respuesta:', xhr.responseText);

                // Limpieza de clases de Bootstrap para mostrar el mensaje de error
                contenedorMensaje.classList.forEach(clase => {
                    if (/^bg-/.test(clase)) {
                        contenedorMensaje.classList.remove(clase);
                    }
                });

                // Añadimos la clase de Bootstrap para mostrar el mensaje de error en rojo
                contenedorMensaje.classList.add("bg-danger");

                // Configuración del mensaje de error
                mensaje.textContent = "Error";
                menajeDetallado.textContent = "Hubo un error al conectar a la api.";

                // Mostramos el modal de error
                errorModal.show();

                // Deshabilitamos el botón de registro
                $('#registerButton').prop('disabled', false);
            }
        });
    } else {
        // Mensaje de advertencia cuando el saldo a agregar es menor o igual a 0
        contenedorMensaje.classList.forEach(clase => {
            if (/^bg-/.test(clase)) {
                contenedorMensaje.classList.remove(clase);
            }
        });
        contenedorMensaje.classList.add("bg-warning");
        mensaje.textContent = "Recuerda!";
        menajeDetallado.textContent = "El saldo a añadir tiene que ser mayor que 0.";
        errorModal.show();
        $('#registerButton').prop('disabled', false);
    }
});

// Función para mostrar el modal con el video de anuncio
function mostrarModal(videoURL) {
    $("#videoFrame").attr("src", videoURL); // Asignación de la URL del video al iframe
    $("#videoModal").fadeIn(); // Mostramos el modal con el video
    $("#cerrarModal").prop('disabled', true) // Deshabilitamos el botón de cerrar durante 5 segundos
    setTimeout(()=>{
        $("#cerrarModal").prop('disabled', false)
    }, 5000);
}

// Evento al cerrar el modal con el video de anuncio
$('#cerrarModal').on('click', function() {
    $("#videoModal").fadeOut(); // Ocultamos el modal con el video
    $('#videoFrame').attr('src', ''); // Limpiamos la URL del video del iframe

    // Limpieza de clases de Bootstrap para mostrar el mensaje de éxito
    contenedorMensaje.classList.forEach(clase => {
        if (/^bg-/.test(clase)) {
            contenedorMensaje.classList.remove(clase);
        }
    });

    // Añadimos la clase de Bootstrap para mostrar el mensaje de éxito en verde
    contenedorMensaje.classList.add("bg-success");

    // Configuración del mensaje de éxito
    mensaje.textContent = "Enhorabuena!";
    menajeDetallado.textContent = "Saldo agregado correctamente.";

    // Mostramos el modal de error
    errorModal.show();

    // Deshabilitamos el botón de registro
    $('#registerButton').prop('disabled', false);

    // Evento al cerrar el modal de éxito para redireccionar a la página de la billetera
    botonCerrar.addEventListener("click", function () {
        window.location.href = '/wallet.html'
    });
});

// Función para obtener un video de anuncio de YouTube
function obtenerVideoAnuncio() {
    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/search",
        method: "GET",
        data: {
            part: "snippet",
            q: "anuncio publicidad",
            maxResults: 5, // Obtiene un solo video
            type: "video",
            key: "AIzaSyBz7RRJqQUenmGeyPR2srlGixikLkpRahM" // Clave de API de YouTube
        },
        success: function(data) {
            console.log("Respuesta API:", data);
            if (data.items && data.items.length > 0) {
                // Selección de un video aleatorio de la lista de resultados
                const videoId = data.items[Math.floor(Math.random()*5)].id.videoId;

                // Construcción de la URL del video para mostrarlo en el iframe
                const videoURL = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&rel=0`;

                // Llamada a la función para mostrar el modal con el video de anuncio
                mostrarModal(videoURL);
            } else {
                console.error("No se encontraron videos.");
            }
        },
        error: function(error) {
            console.error("Error al obtener el video:", error);
        }
    });
}