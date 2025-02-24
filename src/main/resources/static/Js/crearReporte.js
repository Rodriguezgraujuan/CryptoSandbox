//RECIBIMOS LOS DATOS DEL MODAL
let errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
let mensaje = document.getElementById("mensaje");
let contenedorMensaje = document.getElementById("conenedor-mensaje");
let menajeDetallado = document.getElementById("menaje-detallado");

//Cuando se envia el formulario de reportes le hacemos un post a la BD
$('#formReporte').on('submit', function(e){
    e.preventDefault();
    let texto = $('#textoReporte').val();
    console.log(texto)

    //Se genera un objeto literal de reporte solo con el texto
    let reporte = {
        descripcion: texto
    }

    //Se envia el reporte solo con el texto y en el servidor se completa el resto.
    // El servidor trata los errores, por eso aqui no hay un .fail. No puede haber errores al enviar el reporte
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