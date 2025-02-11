$(document).ready(function () {
    $.get("/cryptos", (data) => {
        console.log(data)
    }).done((data) => {
        renderCryptos(data)
    }).fail((error) => alert(error))
})


// Renderizar la lista de criptomonedas en el HTML
function renderCryptos(cryptos) {
    let backgroundColor = document.body.style.backgroundColor;
    console.log(backgroundColor.charAt(4));
    if (backgroundColor.charAt(4) === "1"){
        backgroundColor = "rgb(51,51,51)";
    }
    let color = document.body.style.color;
    let cryptoList = document.getElementById('crypto-list');
    cryptoList.innerHTML = cryptos.map(crypto => `
    <li class="list-group-item d-flex justify-content-between align-items-center" style="background-color: ${backgroundColor}; color: ${color}">
        <span>${crypto.name}</span>
        <span class="badge bg-primary">${crypto.value} EUR</span>
    </li>`).join('');
}



