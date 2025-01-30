$(document).ready(function () {
    $.get("http://localhost:8080/cryptos", (data) => {
        console.log(data)
    }).done((data) => {
        renderCryptos(data)
    }).fail((error) => alert(error))
})
// Renderizar la lista de criptomonedas en el HTML
function renderCryptos(cryptos) {
    let cryptoList = document.getElementById('crypto-list');
    cryptoList.innerHTML = cryptos.map(crypto => `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${crypto.name}</span>
        <span class="badge bg-primary">${crypto.value} EUR</span>
    </li>`).join('');
}



