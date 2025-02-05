
$('#cashForm').on('submit', function(e) {
    e.preventDefault();
    console.log("Dentro de agregar saldo")
    let amount = $("#inputCash").val();
    let wallet = {
        balance: amount
    };

    $.ajax({
        url: '/pepe', // URL de tu API
        type: 'POST',
        contentType: 'application/json', // Tipo de contenido
        data: JSON.stringify(wallet), // Convertimos el objeto a JSON

        success: function(response) {
            console.log('Crypto Comprada correctamente', response);
            alert('¡Crypto vendida correctamente!');
            //window.location.href = '/';
        },
        error: function(xhr, status, error) {
            console.log('Error:', error);
            console.log('Estado de la respuesta:', status);
            console.log('Detalles de la respuesta:', xhr.responseText);
            let errorMessage = xhr.responseText || 'Hubo un error al agregar saldo.';
            alert(`Error: ${errorMessage}`);
        }
    });
});
