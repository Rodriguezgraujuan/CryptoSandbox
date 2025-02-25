// Se ejecuta una función cuando el documento HTML está listo
$(document).ready(function () {
    // Se realiza una solicitud AJAX a la URL "/transactionUser"
    $.ajax({
        url: "/transactionUser",
        method: "GET",
        dataType: "text" // Se lee como texto para evitar parseos automáticos
    })
        .done((data) => {
            console.log("Contenido de la respuesta:", data);
            try {
                const jsonData = JSON.parse(data); // Se intenta parsear la respuesta como JSON
                console.log("JSON parseado:", jsonData);
                renderTransaction(jsonData); // Se renderiza la lista de transacciones
                $("#filtro").change(function () {
                    const filtro = $(this).val(); // Se obtiene el valor seleccionado en el filtro
                    const filteredData = filterTransactions(filtro, jsonData); // Se filtran las transacciones
                    renderTransaction(filteredData); // Se renderiza la lista de transacciones filtradas
                });
            } catch (e) {
                console.error("Error al parsear JSON:", e);
            }
        })
        .fail((jqXHR) => {
            console.error("Error en la solicitud:", jqXHR.responseText);
        });
});

// Función que filtra las transacciones según el filtro seleccionado
function filterTransactions(filtro, transactions) {
    if (filtro === "all") {
        return transactions; // Si el filtro es "Todos", no se filtra nada
    }
    return transactions.filter(transaction => transaction.operation === filtro); // Se filtran las transacciones que coincidan con el filtro
}

// Función que renderiza la lista de transacciones
function renderTransaction(transactions) {
    let backgroundColor = document.body.style.backgroundColor; // Se obtiene el color de fondo del cuerpo del documento
    let color = document.body.style.color; // Se obtiene el color del texto del cuerpo del documento
    console.log(backgroundColor.charAt(4));
    if (backgroundColor.charAt(4) === "1"){
        backgroundColor = "rgb(51,51,51)"; // Si el color de fondo es claro, se cambia a un tono más oscuro
    }
    let transactionList = document.getElementById('listed-transactions'); // Se obtiene la lista de transacciones
    transactions.sort((a, b) => a.id - b.id); // Se ordenan las transacciones por ID
    transactionList.innerHTML = transactions.map(transaction => { // Se genera el HTML para cada transacción
        let colorClass;
        let sign;
        if (transaction.operation !== "Intercambio") { // Si la operación no es un intercambio
            if (transaction.operation === "Compra") {
                sign="+";
                colorClass = "text-danger"; // Se establece la clase de color rojo para las compras
            } else if(transaction.operation === "Venta"){
                sign="-";
                colorClass = "text-success"; // Se establece la clase de color verde para las ventas
            }
            return `<li class="list-group-item text-center ${colorClass}" style="background-color: ${backgroundColor};color: ${color}">
                <span>${sign}${Math.round(transaction.quantity*100.0)/100.0}</span>
                <span>${transaction.crypto_name}</span>
            </li>`;
        } else {
            sign=">";
            colorClass = "text-warning"; // Se establece la clase de color amarillo para los intercambios
            return `<li class="list-group-item text-center ${colorClass}" style="background-color: ${backgroundColor};color: ${color}">  
                <span>-${transaction.quantity} ${transaction.crypto_name} ${sign} +${Math.round(transaction.amount*100.0)/100.0} ${transaction.crypto_exchange}</span>  
            </li>`;
        }
    }).join(''); // Se une el HTML de todas las transacciones en una sola cadena
}