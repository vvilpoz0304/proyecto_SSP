window.addEventListener("DOMContentLoaded", function(){

    //Control  en caso de que un usuario intente acceder a otras páginas sin estar logueado;
    let usuario = localStorage.getItem("usuario");

    if(!usuario){
        alert("You need to be logged first!")
        this.window.location.href = "index.html";
    }

    //Cogemos el primer elemento que haya en el body para poner la cabecera lo primero de todo.
    let primerElemento = this.document.body.firstElementChild;
    let header = this.document.createElement("header");

    primerElemento.before(header);

    let botonHome = this.document.createElement("button");
    botonHome.textContent = "Volver al Inicio"

    let titulo = this.document.createElement("p");
    titulo.textContent = 'Valentin´s Car';

    let botonCerrar = this.document.createElement("button");
    botonCerrar.textContent = "Cerrar Sesión";

    let cabecera = this.document.getElementsByTagName("header")[0];

    //Añadimos los elementos a la cabecera;
    cabecera.append(botonHome)
    cabecera.append(titulo)
    cabecera.append(botonCerrar);

    //Al igual que con la cabecera, cogemos el ultimo elemento para colocar el pie al final.
    let ultimoElemento = this.document.body.lastElementChild;
    let footer = this.document.createElement("footer");

    ultimoElemento.after(footer);

    footer.textContent = "© Todos los derechos reservados a Valentin´s Car 2024";

    
    //Añadimos la función de redirección a los botones del header;
    this.document.getElementsByTagName('header')[0].firstElementChild.addEventListener('click', function(){
        window.location.href = "home.html"
    })
    this.document.getElementsByTagName('header')[0].lastElementChild.addEventListener('click', function(){
        localStorage.removeItem("usuario");
        window.location.href = "index.html"
    })

})