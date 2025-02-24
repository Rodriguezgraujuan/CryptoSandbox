$('#exchangeForm').on('submit', function(e) {
    e.preventDefault();
    $("#intercamb").prop('disabled', true);
    console.log("Dentro de exchange Form")
    let cryptoOrigen = $("#selectedCrypto").val();
    let cryptoDestino = $("#destinationCrypto").val();
    let quantity = $("#exchangeAmount").val();

    let transaction = {
        crypto_name: cryptoOrigen,
        quantity: quantity,
        operation: "Intercambio",
        crypto_exchange: cryptoDestino
    };

    $.ajax({
        url: '/createTransaction', // URL de tu API
        type: 'POST',
        contentType: 'application/json', // Tipo de contenido
        data: JSON.stringify(transaction), // Convertimos el objeto a JSON

        success: function() {

            contenedorMensaje.classList.forEach(clase => {
                if (/^bg-/.test(clase)) {
                    contenedorMensaje.classList.remove(clase);
                }
            });
            contenedorMensaje.classList.add("bg-success");
            mensaje.textContent = "Enhorabuena!";
            menajeDetallado.textContent = "Intercambio realizado correctamente.";
            errorModal.show();
            $('#registerButton').prop('disabled', false);
            botonCerrar.addEventListener("click", function () {
                window.location.href = '/wallet.html'
            });
        },
        error: function(xhr, status, error) {
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
            menajeDetallado.textContent = "Hubo un error al intercambiar criptomonedas, comprueba la cantidad que quieres intercambiar.";
            errorModal.show();
            $('#registerButton').prop('disabled', false);
            $("#intercamb").prop('disabled', false);


        }
    });
});