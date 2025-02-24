let users = [

];
getUsers()
function getUsers() {
    $.get("/users", (data) => {
        console.log(data);
    }).done((data) => {
        users = data;

        renderUsers();
    }).fail((error) => alert(error));
}

function renderUsers(filter = "") {
    const userList = document.getElementById("userList");
    userList.innerHTML = "";
    users
        .filter(user => user.username.toLowerCase().includes(filter.toLowerCase()))
        .forEach(user => {
            const div = document.createElement("div");
            div.className = "user-item p-1 border-bottom";
            div.textContent = user.username;
            div.style.cursor = "pointer";
            div.onclick = () => selectUser(user);
            userList.appendChild(div);
        });
}

function selectUser(user) {
    document.getElementById("selectedUser").innerHTML = `
                    <p hidden id="userID">${user.id}</p>
                    <p><strong>Nombre:</strong> ${user.username}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Rol:</strong> ${user.rol}</p>
                    <button class="btn btn-danger" id="delete">Eliminar</button>
                `;
}

document.getElementById("searchUser").addEventListener("input", (e) => {
    renderUsers(e.target.value);
});
document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "delete") {
        let id = document.getElementById("userID").textContent;
        console.log("Eliminando usuario con ID:", id);

        $.get(`/delete/${id}`)
            .done(() => {
                console.log("Usuario eliminado correctamente");
                window.location.href = "/administrador.html";
            })
            .fail(() => {
                console.error("Usuario eliminado correctamente");
                window.location.href = "/administrador.html";
            });
    }
});