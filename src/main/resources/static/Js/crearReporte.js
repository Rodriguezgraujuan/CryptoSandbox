let errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
let mensaje = document.getElementById("mensaje");
let contenedorMensaje = document.getElementById("conenedor-mensaje");
let menajeDetallado = document.getElementById("menaje-detallado");

$('#formReporte').on('submit', function(e){
    e.preventDefault();
    let texto = $('#textoReporte').val();
    console.log(texto)
    let reporte = {
        descripcion: texto
    }

    $.ajax({
        url: '/addReport', // URL de tu API
        type: 'POST',
        contentType: 'application/json', // Tipo de contenido
        data: JSON.stringify(reporte), // Convertimos el objeto a JSON

        success: function() {
            contenedorMensaje.classList.forEach(clase => {
                if (/^bg-/.test(clase)) {
                    contenedorMensaje.classList.remove(clase);
                }
            });
            contenedorMensaje.classList.add("bg-success");
            mensaje.textContent = "Enhorabuena!";
            menajeDetallado.textContent = "Reporte enviado correctamente.";
            errorModal.show();
            $('#registerButton').prop('disabled', false);
        }
    });
});