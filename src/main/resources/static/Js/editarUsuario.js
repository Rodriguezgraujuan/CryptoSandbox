$(document).ready(function () {
    $("#editProfileForm").on("submit", function (event) {
        event.preventDefault(); // Evita el envío del formulario tradicional
        $("#editButton").attr("disabled", true);
        
        const username = $("#name").val();
        const email = $("#email").val();
        const password = $("#password").val().trim();
        const confirmPassword = $("#confirm-password").val().trim();

        if (username === "" || email === "") {
            alert("Por favor, complete todos los campos obligatorios.");
            $("#editButton").attr("disabled", false);
            return;
        }

        // Validar que las contraseñas coincidan si se ha ingresado una
        if (password !== "" && password !== confirmPassword) {
            $("#password-error").removeClass("d-none");
            $("#editButton").attr("disabled", false);
            return;
        } else {
            $("#password-error").addClass("d-none");
        }

        // Simulación de guardado (puedes enviar estos datos a un backend)
        event.preventDefault();
        let usuario = {
            username: username,
            email: email,
            password: password
        }
        if (validarContrasena(password)) {
            $.ajax({
                url: "/editProfile",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(usuario),
                success: function (response) {
                    alert("Perfil actualizado correctamente");
                    console.log("Perfil actualizado:", {username, email, password});
                    window.location.href = "/logout";
                },
                error: function (xhr, status, error) {
                    alert("Error al actualizar el perfil");
                }
            })
        }else{
            alert("Contraseña invalida")
            $("#editButton").attr("disabled", false);
        }

    });

    // Mostrar/ocultar contraseña
    $(".toggle-password").on("click", function () {
        const targetId = $(this).attr("data-target");
        const input = $("#" + targetId);
        const icon = $(this).find("i");

        if (input.attr("type") === "password") {
            input.attr("type", "text");
            icon.removeClass("bi-eye").addClass("bi-eye-slash");
        } else {
            input.attr("type", "password");
            icon.removeClass("bi-eye-slash").addClass("bi-eye");
        }
    });
    function validarContrasena(contrasena) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return regex.test(contrasena);
    }
});