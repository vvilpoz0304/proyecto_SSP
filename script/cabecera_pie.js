window.addEventListener("DOMContentLoaded", function(){
    //Cogemos el primer elemento que haya en el body para poner la cabecera lo primero de todo.

    let primerElemento = this.document.body.firstElementChild;
    let header = this.document.createElement("header");

    primerElemento.before(header);


    let titulo = this.document.createElement("p");
    titulo.textContent = 'Valentin´s Car'
    let botonCerrar = this.document.createElement("button");

    botonCerrar.textContent = "Cerrar Sesión";

    let cabecera = this.document.getElementsByTagName("header")[0];

    cabecera.append(titulo)
    cabecera.append(botonCerrar);

    //Al igual que con la cabecera, cogemos el ultimo elemento para colocar el pie al final.

    let ultimoElemento = this.document.body.lastElementChild;
    let footer = this.document.createElement("footer");

    ultimoElemento.after(footer);

    footer.textContent = "Wuiiiii";

})