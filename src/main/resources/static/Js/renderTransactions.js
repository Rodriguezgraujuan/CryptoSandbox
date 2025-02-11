$(document).ready(function () {
    $.ajax({
        url: "/transactionUser",
        method: "GET",
        dataType: "text" // Lee como texto para evitar parseos automáticos
    })
        .done((data) => {
            console.log("Contenido de la respuesta:", data);
            try {
                const jsonData = JSON.parse(data);
                console.log("JSON parseado:", jsonData);
                renderTransaction(jsonData)
            } catch (e) {
                console.error("Error al parsear JSON:", e);
            }
        })
        .fail((jqXHR) => {
            console.error("Error en la solicitud:", jqXHR.responseText);
        });
})

function renderTransaction(transactions) {
    let backgroundColor = document.body.style.backgroundColor;
    let color = document.body.style.color;
    console.log(backgroundColor.charAt(4));
    if (backgroundColor.charAt(4) === "1"){
        backgroundColor = "rgb(51,51,51)";
    }
    let transactionList = document.getElementById('listed-transactions');
    transactions.sort((a, b) => a.id - b.id);
    transactionList.innerHTML = transactions.map(transaction => {
        let colorClass;
        let sign;
        if (transaction.operation !== "Intercambio") {


        if (transaction.operation === "Compra") {
            sign="+";
            colorClass = "text-danger"
        }else if(transaction.operation === "Venta"){
            sign="-";
            colorClass = "text-success"
        }
        return `<li class="list-group-item text-center ${colorClass}" style="background-color: ${backgroundColor};color: ${color}">
        <span>${sign}${Math.round(transaction.quantity*100.0)/100.0}</span>
        <span>${transaction.crypto_name}</span>
    </li>`}else {
            sign=">";
            colorClass = "text-warning";
            return `<li class="list-group-item text-center ${colorClass}" style="background-color: ${backgroundColor};color: ${color}">  
            <span>-${transaction.quantity} ${transaction.crypto_name} ${sign} +${Math.round(transaction.amount*100.0)/100.0} ${transaction.crypto_exchange}</span>  
        </li>`
        }}).join('');
}



