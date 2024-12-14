window.addEventListener("DOMContentLoaded", function () {
    //Conseguimos los datos necesarios para listar los examenes creados;
    let listaExamenes = JSON.parse(this.localStorage.getItem("examenes"))
    let fechaHoy = new Date();
    let num;
    //Filtramos la lista de examenes por los examenes que tengan la fecha de hoy en adelante;
    listaExamenes = listaExamenes.filter(examen => new Date(examen.fecha) >= new Date(fechaHoy));

    ///////////////////////////////////////////
    //// Para mostrar la lista de examenes ////
    ///////////////////////////////////////////

    console.log(listaExamenes)

    //  Función para mostrar la tabla con: el numero del examen, la categoria y el botón para realizarlo
    function mostrarListaExamenes() {
        let tabla = document.createElement("table");

        for (let i = 0; i < listaExamenes.length; i++) {
            let fila = document.createElement("tr");

            let columnaNumeroExamen = document.createElement("td");
            let numeroExamen = document.createElement("p");
            numeroExamen.textContent = listaExamenes[i].numeroExamen;
            columnaNumeroExamen.append(numeroExamen)

            let columnaCategoria = document.createElement("td");
            let categoriaExamen = document.createElement("p")
            categoriaExamen.textContent = listaExamenes[i].categoria;
            columnaCategoria.append(categoriaExamen);

            let columnaBotones = document.createElement("td");
            let boton = document.createElement("button");
            let fecha = document.createElement("p");
            fecha.textContent = "Fecha Limite: " + listaExamenes[i].fecha;
            boton.setAttribute("class", "realizar")
            boton.setAttribute("id", listaExamenes[i].numeroExamen)
            boton.textContent = "Realizar Examen";
            columnaBotones.append(fecha, boton)

            fila.append(columnaNumeroExamen, columnaCategoria, columnaBotones);
            tabla.append(fila);
        }

        document.getElementsByTagName("main")[0].append(tabla)
    }

    mostrarListaExamenes();

    this.document.getElementsByTagName("main")[0].addEventListener("click", function (event) {
        if (event.target.classList.contains("realizar")) {
            num = event.target.id;
            confirmar();
        }
    })
    function confirmar() {
        let conf = confirm("¿Seguro que desea realizar el examen? (Solo se permite un intento por alumno)");
        if (conf == true) {
            document.getElementById("lista").style.display = "none";
            document.getElementById("examen").style.display = "flex";
            mostrarPregunta(listaExamenes, num);
            return true;

        } else {

            return false;
        }
    }

})