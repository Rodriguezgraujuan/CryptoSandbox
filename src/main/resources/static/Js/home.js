let errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
let mensaje = document.getElementById("mensaje");
let contenedorMensaje = document.getElementById("conenedor-mensaje");
let menajeDetallado = document.getElementById("menaje-detallado");
let botonCerrar = document.getElementById("cerrar");
let selectedCurrency = null;
let selectedSymbol = null;
let quanti=null;
$(document).ready(function () {
    let cryptoData = {};
    let cryptoQuantity;

    $.get("/CryptosOwn", (data) => {
        cryptoQuantity = data
        console.log(cryptoQuantity)
    }).done(() => {
        $("#quantity-crypto").text("READY");
    })
    // Cargar y renderizar criptomonedas desde el servidor
    $.get("/cryptos", (data) => {
        cryptoData = data.reduce((acc, crypto) => {
            acc[crypto.name] = crypto.value;
            return acc;
        }, {});
    }).done((data) => {
        renderCryptos(data);
    }).fail(function (xhr, status, error) {
        errorModal.show();
        $('#registerButton').prop('disabled', false);
    });

    // Manejador de selección de criptomoneda
    $(document).on("click", "#crypto-list li", function () {
        selectedCurrency = $(this).find("span:first").text();
        $.get(`/crypto/${selectedCurrency}`, (data) => {
            console.log(data)
        }).done((data) => {
            selectedSymbol = data.symbol;
            cogersymobolo(selectedSymbol);
            console.log(selectedSymbol)
        }).fail(function (xhr, status, error) {
            errorModal.show();
            $('#registerButton').prop('disabled', false);
        });
        console.log(cryptoQuantity)
        for (let cry of cryptoQuantity){
            if (cry.crypto.name === selectedCurrency){
                $("#quantity-crypto").text(`Tienes: ${Math.round(cry.quantity*100)/100}`).addClass("bg-warning text-black p-3 mb-2 rounded");
            }
        }
        $("#selected-crypto").text(`Seleccionado: ${selectedCurrency}`).addClass("bg-warning text-black p-3 mb-2 rounded");
    })

    // Mostrar inputs al comprar o vender
    $("#btn-comprar").click(() => {
        if (selectedCurrency) {
            $("#comprar-inputs").show();
            $("#vender-inputs").hide();
        } else {
            contenedorMensaje.classList.forEach(clase => {
                if (/^bg-/.test(clase)) {
                    contenedorMensaje.classList.remove(clase);
                }
            });
            contenedorMensaje.classList.add("bg-warning");
            mensaje.textContent = "Recuerda";
            menajeDetallado.textContent = "Selecciona una criptomoneda para comprar";
            errorModal.show();
            $('#registerButton').prop('disabled', false);
        }
    });

    $("#btn-vender").click(() => {
        if (selectedCurrency) {
            $("#vender-inputs").show();
            $("#comprar-inputs").hide();
        } else {
            contenedorMensaje.classList.forEach(clase => {
                if (/^bg-/.test(clase)) {
                    contenedorMensaje.classList.remove(clase);
                }
            });
            contenedorMensaje.classList.add("bg-warning");
            mensaje.textContent = "Recuerda";
            menajeDetallado.textContent = "Selecciona una criptomoneda para vender";
            errorModal.show();
            $('#registerButton').prop('disabled', false);
        }
    });

    // Calcular resultado de la compra
    $("#comprar-amount").on("input", function () {
        let money = parseFloat($(this).val());
        if (money && selectedCurrency) {
            let cryptoAmount = (money / cryptoData[selectedCurrency]).toFixed(4);
            quanti=cryptoAmount
            $("#comprar-result").text(`Puedes comprar ${cryptoAmount} ${selectedCurrency}`);
        } else {
            $("#comprar-result").text("");
        }
    });

    // Calcular resultado de la venta
    $("#vender-amount").on("input", function () {
        let cryptoAmount = parseFloat($(this).val());
        if (cryptoAmount && selectedCurrency) {
            let moneyEarned = (cryptoAmount * cryptoData[selectedCurrency]).toFixed(2);
            $("#vender-result").text(`Ganancia estimada: $${moneyEarned}`);
        } else {
            $("#vender-result").text("");
        }
    });
    $("#comprar-confirm").click(() => {
        let money = parseFloat($("#comprar-amount").val());
        if (!money || money <= 0 || !selectedCurrency) {
            return;
        }
        let cryptoAmount = (money / cryptoData[selectedCurrency]).toFixed(4);
        console.log(`Compraste ${cryptoAmount} ${selectedCurrency} por $${money}`);
    });
    $("#vender-confirm").click(() => {
        let cryptoAmount = parseFloat($("#vender-amount").val());
        let moneyEarned = (cryptoAmount * cryptoData[selectedCurrency]).toFixed(2);
        console.log(`Vendiste ${cryptoAmount} ${selectedCurrency} por $${moneyEarned}`);
    });
});

$('#comprar-inputs').on('submit', function(e) {
    e.preventDefault();
    $("#comprar-confirm").prop('disabled', true);
    $("#vender-confirm").prop('disabled', true);
    console.log("Dentro de compras")
    console.log(selectedCurrency)
    let cryptoAmount = $("#comprar-amount").val();
    console.log(cryptoAmount)
    let transaction = {
        crypto_name: selectedCurrency.toString(),
        amount: cryptoAmount,
        operation: "Compra",
    };
    console.log(quanti)
    if (quanti>=0.01) {
        $.ajax({
            url: '/createTransaction', // URL de tu API
            type: 'POST',
            contentType: 'application/json', // Tipo de contenido
            data: JSON.stringify(transaction), // Convertimos el objeto a JSON

            success: function (response) {
                console.log('Crypto Comprada correctamente', response);
                contenedorMensaje.classList.forEach(clase => {
                    if (/^bg-/.test(clase)) {
                        contenedorMensaje.classList.remove(clase);
                    }
                });
                contenedorMensaje.classList.add("bg-success");
                mensaje.textContent = "Enhorabuena!";
                menajeDetallado.textContent = "Criptomoneda Comprada correctamente.";
                errorModal.show();
                $('#registerButton').prop('disabled', false);
                botonCerrar.addEventListener("click",function (){
                    window.location.href = '/wallet.html'
                });},
            error: function (xhr, status, error) {
                console.log('Error:', error);
                console.log('Estado de la respuesta:', status);
                console.log('Detalles de la respuesta:', xhr.responseText);

                contenedorMensaje.classList.forEach(clase => {
                    if (/^bg-/.test(clase)) {
                        contenedorMensaje.classList.remove(clase);
                    }
                });
                contenedorMensaje.classList.add("bg-danger");
                mensaje.textContent = "Error";
                menajeDetallado.textContent = "Hubo un error al comprar la crypto.";
                errorModal.show();
                $('#registerButton').prop('disabled', false);
            }
        });
    }else {
        contenedorMensaje.classList.forEach(clase => {
            if (/^bg-/.test(clase)) {
                contenedorMensaje.classList.remove(clase);
            }
        });
        contenedorMensaje.classList.add("bg-warning");
        mensaje.textContent = "Recuerda";
        menajeDetallado.textContent = "Por favor ingresa una cantidad válida de dinero, minimo tienes que ganar 0,01 criptomonedas.";
        errorModal.show();
        $('#registerButton').prop('disabled', false);
        $("#comprar-confirm").prop('disabled', false);
        $("#vender-confirm").prop('disabled', false);
    }
});

$('#vender-inputs').on('submit', function(e) {
    e.preventDefault();
    $("#comprar-confirm").prop('disabled', true);
    $("#vender-confirm").prop('disabled', true);
    console.log("Dentro de ventas")
    console.log(selectedCurrency)
    let quantity = $("#vender-amount").val();
    console.log(quantity)
    let transaction = {
        crypto_name: selectedCurrency.toString(),
        quantity: quantity,
        operation: "Venta",
    };
    if (quantity>=0.01) {
        $.ajax({
            url: '/createTransaction', // URL de tu API
            type: 'POST',
            contentType: 'application/json', // Tipo de contenido
            data: JSON.stringify(transaction), // Convertimos el objeto a JSON

            success: function (response) {
                console.log('Crypto comprada correctamente', response);
                contenedorMensaje.classList.forEach(clase => {
                    if (/^bg-/.test(clase)) {
                        contenedorMensaje.classList.remove(clase);
                    }
                });
                contenedorMensaje.classList.add("bg-success");
                mensaje.textContent = "Enhorabuena!";
                menajeDetallado.textContent = "Criptomoneda comprada correctamente.";
                errorModal.show();
                $('#registerButton').prop('disabled', false);
                botonCerrar.addEventListener("click", function () {
                    window.location.href = '/wallet.html'
                });
            },
            error: function (xhr, status, error) {
                console.log('Error:', error);
                console.log('Estado de la respuesta:', status);
                console.log('Detalles de la respuesta:', xhr.responseText);

                mensaje.textContent = "Error";
                menajeDetallado.textContent = "No tienes suficientes cryptos.";
                errorModal.show();
                $('#registerButton').prop('disabled', false);
                $("#comprar-confirm").prop('disabled', false);
                $("#vender-confirm").prop('disabled', false);
            }
        });
    }else{
        contenedorMensaje.classList.forEach(clase => {
            if (/^bg-/.test(clase)) {
                contenedorMensaje.classList.remove(clase);
            }
        });
        contenedorMensaje.classList.add("bg-warning");
        mensaje.textContent = "Recuerda";
        menajeDetallado.textContent = "Por favor ingresa una cantidad válida de dinero, minimo tienes que ganar 0,01 criptomonedas.";
        errorModal.show();
        $('#registerButton').prop('disabled', false);
        $("#comprar-confirm").prop('disabled', false);
        $("#vender-confirm").prop('disabled', false);
    }
});