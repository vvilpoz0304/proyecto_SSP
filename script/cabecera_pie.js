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
    let modo = this.document.createElement("select");
    let claro = this.document.createElement("option");
    claro.setAttribute("value", "claro");
    claro.textContent = "Claro";
    let oscuro = this.document.createElement("option");
    oscuro.setAttribute("value", "oscuro");
    oscuro.textContent = "Oscuro";
    modo.append(claro, oscuro);
    let p = this.document.createElement("p")
    p.textContent = "© Todos los derechos reservados a Valentin's Car 2024";
    footer.append(p, modo)
    ultimoElemento.after(footer);

    // Eventos para los botones del header
    botonHome.addEventListener("click", function () {
        window.location.href = "home.html";
    });

    botonCerrar.addEventListener("click", function () {
        localStorage.removeItem("usuario");
        window.location.href = "index.html";
    });

    document.getElementsByTagName("footer")[0].lastElementChild.addEventListener("input", function () {
        let modo = document.getElementsByTagName("footer")[0].lastElementChild.value;

        localStorage.setItem("modo", modo);

        if (modoEntre === "oscuro") {
            // Añadir el CSS solo si no está ya presente
            if (!document.querySelector('link[data-theme="oscuro"]')) {
                let cssOscuro = document.createElement("link");
                cssOscuro.setAttribute("rel", "stylesheet");
                cssOscuro.setAttribute("href", "css/modoOscuro.css");
                cssOscuro.setAttribute("data-theme", "oscuro"); // Identificador único
                document.getElementsByTagName("script")[0].before(cssOscuro);
            }
        
            // Cambiar imágenes a modo oscuro
            let fotoHome = document.getElementsByTagName("header")[0]
                .firstElementChild.getElementsByTagName("img")[0];
            fotoHome.src = "images/homeOscuro.png";
        
            let fotoLogOut = document.getElementsByTagName("header")[0]
                .lastElementChild.getElementsByTagName("img")[0];
            fotoLogOut.src = "images/logOutOscuro.png";
        
        } else {
            // Buscar y eliminar únicamente el CSS del tema oscuro
            let cssOscuro = document.querySelector('link[data-theme="oscuro"]');
            if (cssOscuro) {
                cssOscuro.remove();
            }
        
            // Restaurar imágenes al modo claro
            let fotoHome = document.getElementsByTagName("header")[0]
                .firstElementChild.getElementsByTagName("img")[0];
            fotoHome.src = "images/home.png";
        
            let fotoLogOut = document.getElementsByTagName("header")[0]
                .lastElementChild.getElementsByTagName("img")[0];
            fotoLogOut.src = "images/logOut.png";
        }
        window.location.reload();
    })
    let modoLocal = this.localStorage.getItem("modo");
    let modoEntre = document.getElementsByTagName("footer")[0].lastElementChild.value = modoLocal;
    if (modoEntre === "oscuro") {
        // Añadir el CSS solo si no está ya presente
        if (!document.querySelector('link[data-theme="oscuro"]')) {
            let cssOscuro = document.createElement("link");
            cssOscuro.setAttribute("rel", "stylesheet");
            cssOscuro.setAttribute("href", "css/modoOscuro.css");
            cssOscuro.setAttribute("data-theme", "oscuro"); // Identificador único
            document.getElementsByTagName("script")[0].before(cssOscuro);
        }
    
        // Cambiar imágenes a modo oscuro
        let fotoHome = document.getElementsByTagName("header")[0]
            .firstElementChild.getElementsByTagName("img")[0];
        fotoHome.src = "images/homeOscuro.png";
    
        let fotoLogOut = document.getElementsByTagName("header")[0]
            .lastElementChild.getElementsByTagName("img")[0];
        fotoLogOut.src = "images/logOutOscuro.png";
    
    } else {
        // Buscar y eliminar únicamente el CSS del tema oscuro
        let cssOscuro = document.querySelector('link[data-theme="oscuro"]');
        if (cssOscuro) {
            cssOscuro.remove();
        }
    
        // Restaurar imágenes al modo claro
        let fotoHome = document.getElementsByTagName("header")[0]
            .firstElementChild.getElementsByTagName("img")[0];
        fotoHome.src = "images/home.png";
    
        let fotoLogOut = document.getElementsByTagName("header")[0]
            .lastElementChild.getElementsByTagName("img")[0];
        fotoLogOut.src = "images/logOut.png";
    }
});
