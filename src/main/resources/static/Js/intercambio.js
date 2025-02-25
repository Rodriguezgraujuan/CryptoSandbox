// Event listener para el formulario de intercambio
$('#exchangeForm').on('submit', function(e) {
    // Previene el comportamiento por defecto del formulario (recarga de página)
    e.preventDefault();

    // Deshabilita el botón de intercambio mientras se realiza la operación
    $("#intercamb").prop('disabled', true);

    // Muestra un mensaje en la consola para depuración
    console.log("Dentro de exchange Form")

    // Obtiene los valores seleccionados en los selectores de criptomonedas
    let cryptoOrigen = $("#selectedCrypto").val();
    let cryptoDestino = $("#destinationCrypto").val();

    // Obtiene la cantidad introducida en el campo de cantidad
    let quantity = $("#exchangeAmount").val();

    // Crea un objeto de transacción con los datos obtenidos
    let transaction = {
        crypto_name: cryptoOrigen,
        quantity: quantity,
        operation: "Intercambio",
        crypto_exchange: cryptoDestino
    };

    // Realiza una petición AJAX para crear la transacción
    $.ajax({
        url: '/createTransaction', // URL de tu API
        type: 'POST',
        contentType: 'application/json', // Tipo de contenido
        data: JSON.stringify(transaction), // Convertimos el objeto a JSON

        // Función a ejecutar si la petición es satisfactoria
        success: function() {
            // Limpia las clases de estilo del contenedor del mensaje
            contenedorMensaje.classList.forEach(clase => {
                if (/^bg-/.test(clase)) {
                    contenedorMensaje.classList.remove(clase);
                }
            });

            // Añade la clase de estilo de éxito al contenedor del mensaje
            contenedorMensaje.classList.add("bg-success");

            // Actualiza el texto del mensaje y del mensaje detallado
            mensaje.textContent = "Enhorabuena!";
            menajeDetallado.textContent = "Intercambio realizado correctamente.";

            // Muestra el modal de error
            errorModal.show();

            // Habilita el botón de registro
            $('#registerButton').prop('disabled', false);

            // Añade un evento al botón de cierre del modal para redireccionar a la cartera
            botonCerrar.addEventListener("click", function () {
                window.location.href = '/wallet.html'
            });
        },

        // Función a ejecutar si la petición falla
        error: function(xhr, status, error) {
            // Muestra los detalles del error en la consola para depuración
            console.log('Error:', error);
            console.log('Estado de la respuesta:', status);
            console.log('Detalles de la respuesta:', xhr.responseText);

            // Limpia las clases de estilo del contenedor del mensaje
            contenedorMensaje.classList.forEach(clase => {
                if (/^bg-/.test(clase)) {
                    contenedorMensaje.classList.remove(clase);
                }
            });

            // Añade la clase de estilo de error al contenedor del mensaje
            contenedorMensaje.classList.add("bg-danger");

            // Actualiza el texto del mensaje y del mensaje detallado
            mensaje.textContent = "Error";
            menajeDetallado.textContent = "Hubo un error al intercambiar criptomonedas, comprueba la cantidad que quieres intercambiar.";

            // Muestra el modal de error
            errorModal.show();

            // Habilita el botón de registro y el botón de intercambio
            $('#registerButton').prop('disabled', false);
            $("#intercamb").prop('disabled', false);
        }
    });
});