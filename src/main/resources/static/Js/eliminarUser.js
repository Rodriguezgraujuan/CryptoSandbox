$(document).ready( ()=>{
    $("#delete").on("click", (event) =>{
        $.get("/delete", (data) => {
        }).done((data) => {
            window.location.href= "/logout"
        }).fail((error)=>{
            console.log("Usuario eliminado correctamente")
            window.location.href= "/logout"
        })
    })
})

