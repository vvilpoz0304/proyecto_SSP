window.addEventListener("DOMContentLoaded", function () {
    //Conseguimos los datos necesarios para listar los examenes creados;
    let listaExamenes = JSON.parse(this.localStorage.getItem("examenes"))
    let listaCategorias = JSON.parse(localStorage.getItem("categorias")) || [];
    let examenesPorCategoria = [];
    let fechaHoy = new Date();
    let num;

    //Filtramos la lista de examenes por los examenes que tengan la fecha de hoy en adelante;
    listaExamenes = listaExamenes.filter(examen => new Date(examen.fecha) >= new Date(fechaHoy));

    ///////////////////////////////////////////
    //// Para mostrar la lista de examenes ////
    ///////////////////////////////////////////

    console.log(listaExamenes)
    //Añadimos las categorias a filtrar

    if (listaCategorias.length > 0) {
        let opcionEnBlanco = document.createElement("option");
        opcionEnBlanco.setAttribute("value", "...");
        opcionEnBlanco.textContent = "...";
        document.getElementsByTagName("select")[0].append(opcionEnBlanco); //Declaramos un espacio en blanco para que no coja la primera categoria por defectoy haya que dar 2 clicks
        for (let i = 0; i < listaCategorias.length; i++) {
            let opcionCategorias = document.createElement("option");
            opcionCategorias.setAttribute("value", listaCategorias[i]);
            opcionCategorias.textContent = listaCategorias[i];
            document.getElementsByTagName("select")[0].append(opcionCategorias);
        }
    } else { // En caso de no haber categorias, saldrá la opcion de que no hay categorias;
        let noCategorias = this.document.createElement("option");
        noCategorias.setAttribute("value", "No hay categorias disponibles");
        document.getElementsByTagName("select")[0].append(noCategorias);
    }

    this.document.getElementsByTagName("select")[0].addEventListener("input", function () {
        document.getElementById("lista").firstElementChild.nextElementSibling.nextElementSibling.innerHTML = "";
        let categoriaSeleccionada = document.getElementsByTagName("select")[0].value;
        examenesPorCategoria = []
        for (let i = 0; i < listaExamenes.length; i++) {
            if (listaExamenes[i].categoria === categoriaSeleccionada) {
                examenesPorCategoria.push(listaExamenes[i]);
            }
        }
        mostrarListaExamenes(categoriaSeleccionada);
    })

    //  Función para mostrar la tabla con: el numero del examen, la categoria y el botón para realizarlo
    function mostrarListaExamenes(categoria) {
        let tabla = document.createElement("table");

        for (let i = 0; i < examenesPorCategoria.length; i++) {
            let fila = document.createElement("tr");

            let columnaNumeroExamen = document.createElement("td");
            let numeroExamen = document.createElement("p");
            numeroExamen.textContent = examenesPorCategoria[i].numeroExamen;
            columnaNumeroExamen.append(numeroExamen)

            let columnaCategoria = document.createElement("td");
            let categoriaExamen = document.createElement("p")
            categoriaExamen.textContent = examenesPorCategoria[i].categoria;
            columnaCategoria.append(categoriaExamen);

            let columnaBotones = document.createElement("td");
            let boton = document.createElement("button");
            let fecha = document.createElement("p");
            fecha.textContent = "Fecha Limite: " + examenesPorCategoria[i].fecha;
            boton.setAttribute("class", "realizar")
            boton.setAttribute("id", examenesPorCategoria[i].numeroExamen)
            boton.textContent = "Realizar Examen";
            columnaBotones.append(fecha, boton)

            fila.append(columnaNumeroExamen, columnaCategoria, columnaBotones);
            tabla.append(fila);
        }

        document.getElementsByTagName("main")[0].firstElementChild.nextElementSibling.nextElementSibling.append(tabla)
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

            // Reiniciamos el índice y mostramos la primera pregunta.
            indicePregunta = 0;
            mostrarPregunta(listaExamenes, num, indicePregunta);

            // Inicializamos la visibilidad de los botones.
            document.getElementById("preguntaSiguiente").style.display = "block"; // Mostrar "Siguiente".
            return true;

        } else {
            return false;
        }
    }

    ///////////////////////////////////////////////
    //// Para mostrar la realizacion de examen ////
    ///////////////////////////////////////////////
    let tabla = this.document.createElement("table");
    let numeroPregunta = 1;
    let indicePregunta = 0; // Índice de la pregunta actual en el examen.


    function mostrarPregunta(listaExamenes, num, indice) {
        tabla.innerHTML = ""; // Limpiamos la tabla cada vez que se muestre una pregunta.

        // Declaramos una fila para el enunciado.
        let filaEnunciado = document.createElement("tr");

        // Crear y añadir el texto de la pregunta.
        let pregunta = document.createElement("p");
        pregunta.textContent = (indice + 1) + ".- " + listaExamenes[num].preguntas[indice].enunciado; // Mostrar índice actual.
        filaEnunciado.append(pregunta);

        // Añadir la fila del enunciado.
        tabla.append(filaEnunciado);

        // Randomizar las respuestas.
        let respuestas = [
            { texto: listaExamenes[num].preguntas[indice].respuestaCorrecta, esCorrecta: true },
            { texto: listaExamenes[num].preguntas[indice].respuestaIncorrecta1, esCorrecta: false },
            { texto: listaExamenes[num].preguntas[indice].respuestaIncorrecta2, esCorrecta: false },
        ];
        respuestas = respuestas.sort(() => Math.random() - 0.5);

        // Crear y añadir las filas para las respuestas randomizadas.
        respuestas.forEach((respuesta, i) => {
            let filaRespuesta = document.createElement("tr");

            let opcion = document.createElement("input");
            opcion.setAttribute("type", "radio");
            opcion.setAttribute("name", "pregunta" + (indice + 1)); // Nombre único para cada pregunta.
            if (respuesta.esCorrecta) {
                opcion.setAttribute("value", "correcta");
            } else {
                opcion.setAttribute("value", "falsa");
            }

            let label = document.createElement("label");
            label.setAttribute("for", `opcion_${i}_${indice}`);
            label.textContent = respuesta.texto;

            filaRespuesta.append(opcion, label);
            tabla.append(filaRespuesta);
        });

        document.getElementById("preguntaSiguiente").before(tabla); // Añadir la tabla antes del botón "Siguiente".
        document.getElementsByTagName("table")[0].style.margin = "0% 0% 0% 35%"
    }

    document.getElementById("comprobar").addEventListener("click", function () {
        // Obtener la respuesta seleccionada
        let respuestaSeleccionada = document.querySelector(`input[name="pregunta${numeroPregunta}"]:checked`);
        
        // Obtener todas las respuestas no seleccionadas
        let respuestasNoSeleccionadas = document.querySelectorAll(`input[name="pregunta${numeroPregunta}"]:not(:checked)`);
    
        if (!respuestaSeleccionada) {
            console.error("No has seleccionado ninguna respuesta.");
            alert("Por favor, selecciona una respuesta antes de comprobar.");
            return;
        }
    
        // Cambiar el color del texto del label
        if (respuestaSeleccionada.value === "correcta") {
            // Cambiar el color del label de la respuesta seleccionada a verde
            respuestaSeleccionada.nextElementSibling.style.color = "green";
        } else {
            // Cambiar el color del label de la respuesta seleccionada a rojo
            respuestaSeleccionada.nextElementSibling.style.color = "red";
    
            // Cambiar el color de los labels de las respuestas correctas
            respuestasNoSeleccionadas.forEach(respuesta => {
                if (respuesta.value === "correcta") {
                    respuesta.nextElementSibling.style.color = "green";
                } else {
                    respuesta.nextElementSibling.style.color = "red";
                }
            });
        }
    
        document.getElementById("comprobar").style.display = "none";
    });
    
    

    document.getElementById("preguntaSiguiente").addEventListener("click", function () {
        numeroPregunta++;
        document.getElementById("comprobar").style.display = "block";
        if (indicePregunta < listaExamenes[num].preguntas.length - 1) {
            indicePregunta++; // Incrementar al siguiente índice.
            mostrarPregunta(listaExamenes, num, indicePregunta);
        }

        // Si estamos en la última pregunta, ocultamos el botón "Siguiente".
        if (indicePregunta === listaExamenes[num].preguntas.length - 1) {
            document.getElementById("preguntaSiguiente").style.display = "none";
            document.getElementById("examen").firstElementChild.getElementsByTagName("table")[0].style.padding = "0% 0% 0% 0%";
            document.getElementById("examen").firstElementChild.getElementsByTagName("table")[0].style.margin = "0% 23% 0% 0%";
        }
    });



})