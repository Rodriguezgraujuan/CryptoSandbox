$(document).ready(function () {
    $.get("/cryptos", (data) => {
        console.log(data)
    }).done((data) => {
        renderCarrusel(data)
    }).fail((error) => alert(error))
})
function renderCarrusel(cryptos){
    let carrusel = $("#carrusel");

    // Crear los elementos con el mismo espaciado
    let cryptoItems = cryptos.map(crypto => `<span>${crypto.name} <span class="bg-warning text-black p-3 mb-2">${crypto.value} EUR</span></span>`).join('');

    // Duplicar los elementos para que el carrusel sea infinito
    carrusel.html(cryptoItems + cryptoItems); // Duplica para hacer el efect
}