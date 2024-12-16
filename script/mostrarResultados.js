window.addEventListener("DOMContentLoaded", function () {
    // Declaramos quien es el usuario que está logueado para filtrar solo sus examenes realizado;
    let usuario = this.localStorage.getItem("usuario")

    // Debemos saber si es estudiante o profesor, en caso de que sea  profesor, podrá ver los examenes de todos los usuarios;
    let rol;
    let lista = JSON.parse(localStorage.getItem("usuariosValidados"));
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].nombre == usuario) {
            rol = lista[i].rol;
        }
    }

    // Si el rol es "profesor" o "admin", verá todos los examenes, si es un estudiante, solo verá los suyos
    if (rol == "profesor" || rol == "admin") {
        mostrarTodosResultados();
    } else if ("estudiante") {
        mostrarResultadosEstudiante();
    }

    function mostrarTodosResultados() {
        //Conseguimos la lista de intentos
        let listaResultados = JSON.parse(localStorage.getItem("intentos")) || [];

        // Ordenamos la lista por nombres para que no salga desordenado
        listaResultados.sort((a, b) => {
            if (a.usuario < b.usuario) return -1; // `a` va antes que `b`
            if (a.usuario > b.usuario) return 1;  // `b` va antes que `a`
            return 0; // Son iguales
        });

        // En caso de no existir resultados, mostrará una imagen y un mensaje informandolo;
        if (listaResultados.length == 0 || !listaResultados) {
            document.getElementsByTagName("main")[0].firstElementChild.style.display = "none";
            let img = document.createElement("img");
            img.setAttribute("src", "images/noResults.png");
            let p = document.createElement("p");
            p.textContent = "Aún no has realizado ningún examen. =("
            document.getElementsByTagName("main")[0].append(img);
            document.getElementsByTagName("div")[0].nextElementSibling.after(p);
        } else {
            // Si existen resultados, creará la tabla con el encabezado donde escribiremos el usuario
            // el numero de examen, el numero de intentos, la fecha que realizó el examen, y la nota conseguida;
            let tabla = document.createElement("table");
            let filaCabecera = document.createElement("tr");
            let usuarioCabecera = document.createElement("th");
            usuarioCabecera.append("Usuario:")
            let numeroCabecera = document.createElement("th");
            numeroCabecera.append("Número de examen:");
            let intentoCabecera = document.createElement("th");
            intentoCabecera.append("Intento número:");
            let fechaCabecera = document.createElement("th");
            fechaCabecera.append("Realizado el:")
            let notaCabecera = document.createElement("th");
            notaCabecera.append("Nota:")
            filaCabecera.append(usuarioCabecera, numeroCabecera, intentoCabecera, fechaCabecera, notaCabecera);
            tabla.append(filaCabecera);

            // Este bucle para rellenar la tabla con los datos es exactamente igual que el utilizado en las funcionalidades anteriores;
            for (let i = 0; i < listaResultados.length; i++) {
                let fila = document.createElement("tr");

                let columnaUsuario = document.createElement("td");
                let usuario = document.createElement("p");
                usuario.textContent = listaResultados[i].usuario;
                columnaUsuario.append(usuario)

                let columnaExamen = document.createElement("td");
                let numExamen = document.createElement("p");
                numExamen.textContent = listaResultados[i].examen;
                columnaExamen.append(numExamen)

                let columnaIntento = document.createElement("td");
                let numIntento = document.createElement("p");
                numIntento.textContent = listaResultados[i].numeroIntentos;
                columnaIntento.append(numIntento);

                let columnaFecha = document.createElement("td");
                let fecha = document.createElement("p");
                fecha.textContent = listaResultados[i].fechaRealizacion;
                columnaFecha.append(fecha)

                let columnaNota = document.createElement("td");
                let nota = document.createElement("p");
                nota.textContent = listaResultados[i].nota;
                columnaNota.append(nota);

                fila.append(columnaUsuario, columnaExamen, columnaIntento, columnaFecha, columnaNota)
                tabla.append(fila);
                if(listaResultados[i].nota >= 5){
                    columnaNota.style.backgroundColor = "green";
                } else columnaNota.style.backgroundColor = "crimson";
            }
            document.getElementsByClassName("contenedorTabla")[0].append(tabla);
        }
    }

    // Esta funcion es exactamente igual que el anterior con la diferencia de que solo se mostrarán los resultados del
    // usuario logueado;
    function mostrarResultadosEstudiante() {
        let listaResultados = JSON.parse(localStorage.getItem("intentos")) || [];
        let listaFiltrada = []

        for (let i = 0; i < listaResultados.length; i++) {
            if (listaResultados[i].usuario == usuario) {
                listaFiltrada.push(listaResultados[i]);
            }
        }
        // En este caso ordenamos la lista por nnmero de examen
        listaFiltrada.sort((a, b) => {
            if (a.examen < b.examen) return -1; // `a` va antes que `b`
            if (a.examen > b.examen) return 1;  // `b` va antes que `a`
            return 0; // Son iguales
        });


        if (listaFiltrada.length == 0 || !listaFiltrada) {
            document.getElementsByTagName("main")[0].firstElementChild.style.display = "none";
            let img = document.createElement("img");
            img.setAttribute("src", "images/noResults.png");
            let p = document.createElement("p");
            p.textContent = "Aún no has realizado ningún examen. =("
            document.getElementsByTagName("main")[0].append(img);
            document.getElementsByTagName("div")[0].nextElementSibling.after(p);
        } else {
            let tabla = document.createElement("table");
            let filaCabecera = document.createElement("tr");
            let usuarioCabecera = document.createElement("th");
            usuarioCabecera.append("Usuario:")
            let numeroCabecera = document.createElement("th");
            numeroCabecera.append("Número de examen:");
            let intentoCabecera = document.createElement("th");
            intentoCabecera.append("Intento número:");
            let fechaCabecera = document.createElement("th");
            fechaCabecera.append("Realizado el:")
            let notaCabecera = document.createElement("th");
            notaCabecera.append("Nota:")
            filaCabecera.append(usuarioCabecera, numeroCabecera, intentoCabecera, fechaCabecera, notaCabecera);
            tabla.append(filaCabecera);


            for (let i = 0; i < listaFiltrada.length; i++) {
                let fila = document.createElement("tr");

                let columnaUsuario = document.createElement("td");
                let usuario = document.createElement("p");
                usuario.textContent = listaFiltrada[i].usuario;
                columnaUsuario.append(usuario)

                let columnaExamen = document.createElement("td");
                let numExamen = document.createElement("p");
                numExamen.textContent = listaFiltrada[i].examen;
                columnaExamen.append(numExamen)

                let columnaIntento = document.createElement("td");
                let numIntento = document.createElement("p");
                numIntento.textContent = listaFiltrada[i].numeroIntentos;
                columnaIntento.append(numIntento);

                let columnaFecha = document.createElement("td");
                let fecha = document.createElement("p");
                fecha.textContent = listaFiltrada[i].fechaRealizacion;
                columnaFecha.append(fecha)

                let columnaNota = document.createElement("td");
                let nota = document.createElement("p");
                nota.textContent = listaFiltrada[i].nota;
                
                columnaNota.append(nota);

                fila.append(columnaUsuario, columnaExamen, columnaIntento, columnaFecha, columnaNota)
                tabla.append(fila);
                if(listaResultados[i].nota >= 5.00){
                    columnaNota.style.backgroundColor = "green";
                } else columnaNota.style.backgroundColor = "crimson";
            }
            document.getElementsByClassName("contenedorTabla")[0].append(tabla);
        }
    }
})