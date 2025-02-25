// Se ejecuta una función cuando el documento HTML está listo
$(document).ready(function () {
    // Se realiza una petición GET a la ruta "/cryptos"
    $.get("/cryptos", (data) => {
        // Se muestra en consola los datos recibidos
        console.log(data)
    }).done((data) => {
        // Se llama a la función renderCryptos con los datos recibidos
        renderCryptos(data)
    }).fail((error) => {
        // Se muestra un mensaje de alerta en caso de error
        alert(error)
    })
})

// Función que renderiza la lista de criptomonedas en el HTML
function renderCryptos(cryptos) {
    // Se obtiene el color de fondo del cuerpo del documento
    let backgroundColor = document.body.style.backgroundColor;
    // Se muestra en consola el cuarto carácter del color de fondo
    console.log(backgroundColor.charAt(4));
    // Si el cuarto carácter es "1", se establece el color de fondo a gris oscuro
    if (backgroundColor.charAt(4) === "1"){
        backgroundColor = "rgb(51,51,51)";
    }
    // Se obtiene el color del texto del cuerpo del documento
    let color = document.body.style.color;
    // Se obtiene la lista de criptomonedas del HTML
    let cryptoList = document.getElementById('crypto-list');
    // Se genera el HTML para cada criptomoneda y se añade a la lista
    cryptoList.innerHTML = cryptos.map(crypto => `
    <li class="list-group-item d-flex justify-content-between align-items-center" style="background-color: ${backgroundColor}; color: ${color}">
        <span>${crypto.name}</span>
        <span class="badge bg-warning text-black">${crypto.value} EUR</span>
    </li>`).join('');
}