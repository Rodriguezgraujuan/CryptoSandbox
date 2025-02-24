$(document).ready( ()=>{
    $("#delete").on("click", (event) =>{
        event.preventDefault()
        $("#delete").on("click", function(event) {
            event.preventDefault(); // Evita que el formulario se envíe automáticamente si es un botón dentro de un formulario

            Swal.fire({
                title: "¿Estás seguro?",
                text: "Esta acción no se puede deshacer.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    $.get("/delete", (data) => {
                    }).done((data) => {
                        Swal.fire("¡Eliminado!", "El elemento ha sido eliminado.", "success");
                        window.location.href= "/logout"
                    }).fail((error)=>{
                        console.log("Usuario eliminado correctamente")
                        window.location.href= "/logout"
                    })
                }
            });
        });


    })
})

