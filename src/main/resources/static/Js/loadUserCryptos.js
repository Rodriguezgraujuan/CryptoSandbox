// Se ejecuta cuando el documento HTML está listo para ser manipulado
$(document).ready(function () {
    // Realiza una solicitud AJAX a la URL "/walletUser"
    $.ajax({
        url: "/walletUser",
        method: "GET",
        dataType: "text" // Lee la respuesta como texto para evitar parseos automáticos
    })
        .done((data) => {
            console.log("Contenido de la respuesta:", data);
            try {
                // Intenta parsear la respuesta como JSON
                const jsonData = JSON.parse(data);
                console.log("JSON parseado:", jsonData);
                // Renderiza las criptomonedas en la lista correspondiente
                renderMyCryptos(jsonData)
                // Renderiza las opciones de criptomonedas en el select correspondiente
                renderMyOptions(jsonData)
            } catch (e) {
                console.error("Error al parsear JSON:", e);
            }
        })
        .fail((jqXHR) => {
            console.error("Error en la solicitud:", jqXHR.responseText);
        });
})

// Función que renderiza las criptomonedas en la lista correspondiente
function renderMyCryptos(cryptos) {
    // Obtiene el color de fondo y color del body
    let backgroundColor = document.body.style.backgroundColor;
    let color = document.body.style.color;
    console.log(backgroundColor.charAt(4));
    // Si el color de fondo es claro, cambia el fondo de las criptomonedas a gris oscuro
    if (backgroundColor.charAt(4) === "1"){
        backgroundColor = "rgb(51,51,51)";
    }
    // Obtiene la lista de criptomonedas
    let cryptosList = document.getElementById('your-crypto-list');
    // Ordena las criptomonedas por ID
    cryptos.sort((a, b) => a.id - b.id);
    // Renderiza cada criptomoneda en la lista
    cryptosList.innerHTML = cryptos.map(crypto => {
        return `<li class="list-group-item text-center" style="background-color: ${backgroundColor}; color: ${color}">
        <span>${crypto.crypto.symbol.toUpperCase()}:</span>
        <span> ${Math.round(crypto.quantity*100.0)/100.0}</span>
    </li>`}).join('');
}

// Función que renderiza las opciones de criptomonedas en el select correspondiente
function renderMyOptions(cryptos) {
    // Obtiene el select de criptomonedas
    let cryptosList = document.getElementById('selectedCrypto');
    // Ordena las criptomonedas por ID
    cryptos.sort((a, b) => a.id - b.id);
    // Añade la opción de selección por defecto
    cryptosList.innerHTML = '<option value="" disabled selected>Selecciona una criptomoneda</option>';
    // Añade cada criptomoneda como opción en el select
    cryptosList.innerHTML += cryptos.map(crypto => {
        return `<option value="${crypto.crypto.name}">${crypto.crypto.symbol.toUpperCase()}</option>`;
    }).join('');
}