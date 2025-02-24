let errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
let mensaje = document.getElementById("mensaje");
let contenedorMensaje = document.getElementById("conenedor-mensaje");
let menajeDetallado = document.getElementById("menaje-detallado");
let botonCerrar = document.getElementById("cerrar");
$('#cashForm').on('submit', function(e) {
    e.preventDefault();
    console.log("Dentro de agregar saldo")
    let amount = $("#inputCash").val();
    let wallet = {
        balance: amount
    };
    if (amount > 0) {
        $.ajax({
            url: '/addcash', // URL de tu API
            type: 'POST',
            contentType: 'application/json', // Tipo de contenido
            data: JSON.stringify(wallet), // Convertimos el objeto a JSON
            success: function () {
                obtenerVideoAnuncio();

            },
            error: function (xhr, status, error) {
                console.log('Error:', error);
                console.log('Estado de la respuesta:', status);
                console.log('Detalles de la respuesta:', xhr.responseText);
                contenedorMensaje.classList.forEach(clase => {
                    if (/^bg-/.test(clase)) {
                        contenedorMensaje.classList.remove(clase);
                    }
                });
                contenedorMensaje.classList.add("bg-danger");
                mensaje.textContent = "Error";
                menajeDetallado.textContent = "Hubo un error al conectar a la api.";
                errorModal.show();
                $('#registerButton').prop('disabled', false);
            }
        });
    } else {
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
function mostrarModal(videoURL) {
    $("#videoFrame").attr("src", videoURL);
    $("#videoModal").fadeIn();
    $("#cerrarModal").prop('disabled', true)
    setTimeout(()=>{
        $("#cerrarModal").prop('disabled', false)
    }, 5000);
}
$('#cerrarModal').on('click', function() {
    $("#videoModal").fadeOut();
    $('#videoFrame').attr('src', '');
    contenedorMensaje.classList.forEach(clase => {
        if (/^bg-/.test(clase)) {
            contenedorMensaje.classList.remove(clase);
        }
    });
    contenedorMensaje.classList.add("bg-success");
    mensaje.textContent = "Enhorabuena!";
    menajeDetallado.textContent = "Saldo agregado correctamente.";
    errorModal.show();
    $('#registerButton').prop('disabled', false);
    botonCerrar.addEventListener("click", function () {
        window.location.href = '/wallet.html'
    });
});
function obtenerVideoAnuncio() {
    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/search",
        method: "GET",
        data: {
            part: "snippet",
            q: "anuncio publicidad",
            maxResults: 5, // Obtiene un solo video
            type: "video",
            key: "AIzaSyBz7RRJqQUenmGeyPR2srlGixikLkpRahM"
        },
        success: function(data) {
            console.log("Respuesta API:", data);
            if (data.items && data.items.length > 0) {
                const videoId = data.items[Math.floor(Math.random()*5)].id.videoId;
                const videoURL = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&rel=0`;
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