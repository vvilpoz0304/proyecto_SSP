window.addEventListener("DOMContentLoaded", function () {
    // Control de usuario logueado
    let usuario = localStorage.getItem("usuario");
    if (!usuario) {
        alert("You need to be logged first!");
        window.location.href = "index.html";
    }

    // Crear y añadir cabecera
    let primerElemento = document.body.firstElementChild;
    let header = document.createElement("header");
    primerElemento.before(header);

    let botonHome = document.createElement("button");
    let iconoHome = document.createElement("img")
    iconoHome.setAttribute("src", "images/home.png")
    botonHome.append(iconoHome)

    let titulo = document.createElement("p");
    titulo.textContent = "Valentin's Car";

    let botonCerrar = document.createElement("button");
    let iconoLogOut = document.createElement("img")
    iconoLogOut.setAttribute("src", "images/logOut.png")
    botonCerrar.append(iconoLogOut)

    header.append(botonHome, titulo, botonCerrar);

    // Crear y añadir pie
    let ultimoElemento = document.body.lastElementChild;
    let footer = document.createElement("footer");
    footer.textContent = "© Todos los derechos reservados a Valentin's Car 2024";
    ultimoElemento.after(footer);

    // Eventos para los botones del header
    botonHome.addEventListener("click", function () {
        window.location.href = "home.html";
    });

    botonCerrar.addEventListener("click", function () {
        localStorage.removeItem("usuario");
        window.location.href = "index.html";
    });

});
