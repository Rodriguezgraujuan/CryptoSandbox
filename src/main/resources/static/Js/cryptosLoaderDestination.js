//Estas get devuelve todas las cryptos
$(document).ready(function () {
    $.get("/cryptos", (data) => {
        console.log(data)
    }).done((data) => {
        listCryptos(data)
    }).fail((error) => alert(error))
})

//Aqui se transforman las cryptos en opciones para el select de intercambios.
function listCryptos(cryptos){
    let select = $("#destinationCrypto");
    let cryptoItems = cryptos.map(crypto => `<option value="${crypto.name}">${crypto.name}</option>`).join('');
    select.html(cryptoItems);
}