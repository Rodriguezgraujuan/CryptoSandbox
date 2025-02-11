$(document).ready(function () {
    $.ajax({
        url: "/walletUser",
        method: "GET",
        dataType: "text" // Lee como texto para evitar parseos automáticos
    })
        .done((data) => {
            console.log("Contenido de la respuesta:", data);
            try {
                const jsonData = JSON.parse(data);
                console.log("JSON parseado:", jsonData);
                renderMyCryptos(jsonData)
                renderMyOptions(jsonData)
            } catch (e) {
                console.error("Error al parsear JSON:", e);
            }
        })
        .fail((jqXHR) => {
            console.error("Error en la solicitud:", jqXHR.responseText);
        });
})

function renderMyCryptos(cryptos) {
    let backgroundColor = document.body.style.backgroundColor;
    let color = document.body.style.color;
    console.log(backgroundColor.charAt(4));
    if (backgroundColor.charAt(4) === "1"){
        backgroundColor = "rgb(51,51,51)";
    }
    let cryptosList = document.getElementById('your-crypto-list');
    cryptos.sort((a, b) => a.id - b.id);
    cryptosList.innerHTML = cryptos.map(crypto => {
        return `<li class="list-group-item text-center" style="background-color: ${backgroundColor}; color: ${color}">
        <span>${crypto.crypto.symbol.toUpperCase()}:</span>
        <span> ${Math.round(crypto.quantity*100.0)/100.0}</span>
    </li>`}).join('');
}

function renderMyOptions(cryptos) {
    let cryptosList = document.getElementById('selectedCrypto');
    cryptos.sort((a, b) => a.id - b.id);
    cryptosList.innerHTML = '<option value="" disabled selected>Selecciona una criptomoneda</option>';
    cryptosList.innerHTML += cryptos.map(crypto => {
        return `<option value="${crypto.crypto.name}">${crypto.crypto.symbol.toUpperCase()}</option>`;
    }).join('');
}

