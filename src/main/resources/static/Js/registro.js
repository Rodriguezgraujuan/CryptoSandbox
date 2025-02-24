let errorModal = new bootstrap.Modal(document.getElementById('errorModal'))
let text = document.getElementById("textModal");
let header = document.getElementById("headerModal");
let title = document.getElementById("titleModal");

$('#registration-form').on('submit', function(e) {
    e.preventDefault();
    $('#registerButton').prop('disabled', true);
    let username = $('#username').val();
    let email = $('#email').val();
    let password = $('#password').val();
    let confirmPassword = $('#confirm-password').val();

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    let userData = { username, email, password };
    if (validarContrasena($("#password").val())) {
        if ($("#terms").is(":checked")) {
            $.ajax({
                url: '/register',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(userData),
                success: function (response) {
                    if (response === "Usuario creado con éxito") {
                        deleteBG(header)
                        header.classList.add("bg-success")
                        title.textContent = "Usuario creado con exito"
                        text.textContent = "El usuario ha sido creado con exito."
                        errorModal.show();
                    }
                    window.location.href = '/login';
                },
                error: function (xhr, status, error) {
                    deleteBG(header)
                    header.classList.add("bg-danger")
                    title.textContent = "Error"
                    text.textContent = "Usuario ya registrado"
                    errorModal.show();

                    $('#registerButton').prop('disabled', false);
                }
            });
        } else {
            deleteBG(header)
            header.classList.add("bg-warning")
            title.textContent = "Advertencia"
            text.textContent = "Debes aceptar los terminos y condiciones."
            errorModal.show();
            $('#registerButton').prop('disabled', false);
        }
    }else{
        deleteBG(header)
        header.classList.add("bg-warning")
        title.textContent = "Advertencia"
        text.textContent = "Contraseña incorrecta, debe contener al menos 8 caracteres, una mayuscula y una minuscula."
        errorModal.show();
        $('#registerButton').prop('disabled', false);
    }
});

function validarContrasena(contrasena) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(contrasena);
}
function deleteBG(header){
    header.classList.forEach(clase => {
        if (clase.startsWith("bg-")) {
            header.classList.remove(clase);
        }
    })
}
$("#password").on("keyup", function() {
    let contrasena = $(this).val();
    validarRequisito(contrasena.length >= 8, "#caracteres");
    validarRequisito(/[A-Z]/.test(contrasena), "#mayuscula");
    validarRequisito(/[a-z]/.test(contrasena), "#minuscula");
});

$("#password").on("keyup", function() {
    verificarCoincidencia();
});

function verificarCoincidencia() {
    let password = $("#password").val();
    let confirmPassword = $("#confirm-password").val();
    let errorElement = $("#password-error");

    if (confirmPassword !== "" && password !== confirmPassword) {
        errorElement.removeClass("d-none").addClass("text-danger").text("Las contraseñas no coinciden.").fadeIn();
    } else if (password === ""|| confirmPassword === "") {
        errorElement.text("No puede estar vacio").fadeOut(() => errorElement.addClass("d-none").removeClass("text-danger"));
    }else {
        errorElement.text("").fadeOut(() => errorElement.addClass("d-none").removeClass("text-danger"));
    }
}

$("#username").on("keyup", () => {
    let username = $("#username").val();
    validarNombre(username);
});

function validarNombre(username) {
    let errorElement = $("#username-error");
    let regex = /^[a-zA-Z0-9_]+$/;
    if (username === "") {
        mostrarError(errorElement, "El nombre de usuario no puede estar vacío.");
    } else if (username.length < 3) {
        mostrarError(errorElement, "Debe tener al menos 3 caracteres.");
    } else if (!regex.test(username)) {
        mostrarError(errorElement, "Solo se permiten letras, números y guion bajo.");
    } else {
        ocultarError(errorElement);
    }
}

function mostrarError(element, mensaje) {
    element.removeClass("d-none").addClass("text-danger").text(mensaje).fadeIn();
}

function ocultarError(element) {
    element.text("").fadeOut(() => element.addClass("d-none").removeClass("text-danger"));
}



function validarRequisito(condicion, etiqueta) {
    if (condicion) {
        $(etiqueta).removeClass("text-danger").addClass("text-success");
        $(etiqueta).find("i").removeClass("bi-x-circle").addClass("bi-check-circle");
    } else {
        $(etiqueta).removeClass("text-success").addClass("text-danger");
        $(etiqueta).find("i").removeClass("bi-check-circle").addClass("bi-x-circle");
    }
}
document.getElementById('togglePassword').addEventListener('click', function () {
    let passwordInput = document.getElementById('password');
    let icon = this.querySelector('i');
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.replace("bi-eye", "bi-eye-slash");
    } else {
        passwordInput.type = "password";
        icon.classList.replace("bi-eye-slash", "bi-eye");
    }
});

document.getElementById('togglePassword2').addEventListener('click', function () {
    let passwordInput = document.getElementById('confirm-password');
    let icon = this.querySelector('i');
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.replace("bi-eye", "bi-eye-slash");
    } else {
        passwordInput.type = "password";
        icon.classList.replace("bi-eye-slash", "bi-eye");
    }
});