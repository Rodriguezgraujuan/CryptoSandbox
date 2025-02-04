$(document).ready(function () {
    $.get("/transactionUser", (data) => {
        console.log(data)
    }).done((data) => {
        //renderCryptos(data)
    }).fail((jqXHR, textStatus, errorThrown) =>{
        console.error("Error en la solicitud:", jqXHR.responseText);
        alert("Error:"+jqXHR.responseText)
    })
})

function renderCryptos(cryptos) {
    /*let cryptoList = document.getElementById('crypto-list');
    cryptoList.innerHTML = cryptos.map(crypto => `
    <li class="list-group-item d-flex justify-content-between align-items-center" style="background-color: #ffffff; color: black">
        <span>${crypto.name}</span>
        <span class="badge bg-primary">${crypto.value} EUR</span>
    </li>`).join('');

     */
}



