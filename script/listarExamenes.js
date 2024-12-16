window.addEventListener("DOMContentLoaded", function () {
    //Conseguimos los datos necesarios para listar los examenes creados;
    let listaExamenes = JSON.parse(this.localStorage.getItem("examenes"))
    let listaCategorias = JSON.parse(localStorage.getItem("categorias")) || [];
    console.log(listaExamenes);
    let examenesPorCategoria = [];
    let fechaHoy = new Date();
    let num;

    let respuestasCorrectas = 0;
    let respuestasIncorrectas = 0;
    let noContestadas = 0;


    //Filtramos la lista de examenes por los examenes que tengan la fecha de hoy en adelante;
    listaExamenes = listaExamenes.filter(examen => new Date(examen.fecha) >= new Date(fechaHoy));

    ///////////////////////////////////////////
    //// Para mostrar la lista de examenes ////
    ///////////////////////////////////////////

    //Añadimos las categorias a filtrar
    if (listaCategorias.length >= 0) {
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

    // Funcion para recoger las preguntas que se muestran según la categoria seleccionada;
    this.document.getElementById("categorias").addEventListener("input", function () {
        // Limpiar el área donde se mostrarán los exámenes
        document.getElementById("lista").firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = "";
    
        let categoriaSeleccionada = document.getElementsByTagName("select")[0].value;
        examenesPorCategoria = [];
    
        // Filtrar los exámenes según la categoría seleccionada
        for (let i = 0; i < listaExamenes.length; i++) {
            if (listaExamenes[i].categoria == categoriaSeleccionada) {
                examenesPorCategoria.push(listaExamenes[i]);
            }
        }
    
        // Llamar a la función para mostrar los exámenes filtrados, solo si hay resultados
        if (examenesPorCategoria.length > 0) {
            console.log(examenesPorCategoria);
            mostrarListaExamenes(); // Llamamos la función sin pasar el parámetro de categoría, ya que lo estamos gestionando dentro
        } else {
            document.getElementsByTagName("main")[0].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = "";
            let advertencia = document.getElementById("advertencia");
          advertencia.style.fontWeight = "bolder";
          advertencia.textContent = "Aún no existen examenes de esta categoría :(";
          let imgError = document.createElement("img")
          imgError.setAttribute("src", "images/noResults.png");
          imgError.setAttribute("class", "error")
          document.getElementsByTagName("main")[0].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.append(imgError);
        }
    })
    
    // Función para mostrar la tabla con los exámenes filtrados
    function mostrarListaExamenes() {
        document.getElementsByTagName("main")[0].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = "";
        // Crear la tabla
        let tabla = document.createElement("table");
    
        // Crear la fila de cabecera de la tabla
        let filaCabecera = document.createElement("tr");
    
        let numeroCabecera = document.createElement("th");
        numeroCabecera.append("Número de examen:");
        
        let categoriaCabecera = document.createElement("th");
        categoriaCabecera.append("Categoria");
        
        let botonCabecera = document.createElement("th");
        botonCabecera.append("Realizar");
    
        filaCabecera.append(numeroCabecera, categoriaCabecera, botonCabecera);
        tabla.append(filaCabecera);  // Añadir la cabecera a la tabla
    
        // Bucle para crear las filas con los datos de los exámenes filtrados
        for (let i = 0; i < examenesPorCategoria.length; i++) {
            let fila = document.createElement("tr");
    
            let columnaNumeroExamen = document.createElement("td");
            let numeroExamen = document.createElement("p");
            numeroExamen.textContent = examenesPorCategoria[i].numeroExamen;
            columnaNumeroExamen.append(numeroExamen);
    
            let columnaCategoria = document.createElement("td");
            let categoriaExamen = document.createElement("p");
            categoriaExamen.textContent = examenesPorCategoria[i].categoria;
            columnaCategoria.append(categoriaExamen);
    
            let columnaBotones = document.createElement("td");
            let boton = document.createElement("button");
            let fecha = document.createElement("p");
            fecha.textContent = "Fecha Limite: " + examenesPorCategoria[i].fecha;
            boton.setAttribute("class", "realizar");
            boton.setAttribute("id", examenesPorCategoria[i].numeroExamen);
            boton.textContent = "Realizar Examen";
            columnaBotones.append(fecha, boton);
    
            fila.append(columnaNumeroExamen, columnaCategoria, columnaBotones);
            tabla.append(fila);  // Añadir la fila a la tabla
        }
    
        // Añadir la tabla al contenedor principal (donde se muestran los exámenes)
        document.getElementsByTagName("main")[0].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.append(tabla);
     
    }


    // Funcion para realizar el examen seleccionado
    this.document.getElementsByTagName("main")[0].addEventListener("click", function (event) {
        if (event.target.classList.contains("realizar")) {
            num = event.target.id;
            confirmar(); // Mensaje de confirmacion
        }
    })
    function confirmar() {
        let conf = confirm("¿Seguro que desea realizar el examen?");
        if (conf) {
            document.getElementById("lista").style.display = "none"; // Ocultamos la lista;
            document.getElementById("examen").style.display = "flex"; // Mostramos la realizacion del examen seleccionado;

            // Reiniciamos el índice y mostramos la primera pregunta.
            indicePregunta = 0;
            mostrarPregunta(listaExamenes, num, indicePregunta);

            // Inicializamos la visibilidad de los botones.
            document.getElementById("preguntaSiguiente").style.display = "block"; // Mostrar boton "Siguiente".
            document.getElementsByTagName("header")[0].firstElementChild.style.display = "none"
            document.getElementsByTagName("header")[0].lastElementChild.style.display = "none";
            return true;
        } else {
            return false;
        }
    }

    ///////////////////////////////////////////////
    //// Para mostrar la realizacion de examen ////
    ///////////////////////////////////////////////

    let tabla = this.document.createElement("table"); // Declaramos la tabla donde vamos a escribir la tabla;
    let numeroPregunta = 1;
    let indicePregunta = 0; // Índice de la pregunta actual en el examen.


    function mostrarPregunta(listaExamenes, num, indice) {
        console.log(listaExamenes[num])
        console.log(num)
        console.log(indice)
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

    // Listener  para pasar a la siguiente pregunta;
    document.getElementById("preguntaSiguiente").addEventListener("click", function () {
        numeroPregunta++;

        //Coomprobamos si se ha pasado a la siguiente pregunta sin haber contestado, en ese caso se suma una "noContestada";
        let respuestaSeleccionada = document.querySelector(`input[name="pregunta${numeroPregunta}"]:checked`);
        if (!respuestaSeleccionada) {
            noContestadas++;
        }

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

    // Listener para corregir la pregunta;
    document.getElementById("comprobar").addEventListener("click", function () {
        // Obtener la respuesta seleccionada
        let respuestaSeleccionada = document.querySelector(`input[name="pregunta${numeroPregunta}"]:checked`);

        // Obtener todas las respuestas no seleccionadas
        let respuestasNoSeleccionadas = document.querySelectorAll(`input[name="pregunta${numeroPregunta}"]:not(:checked)`);

        // En caso de no contestar y corregir, te muestra la opcion correcta en verde y las incorrectas en rojo;
        if (!respuestaSeleccionada) {
            noContestadas++;
            respuestasNoSeleccionadas.forEach(respuesta => {
                if (respuesta.value === "correcta") {
                    respuesta.nextElementSibling.style.color = "green";
                } else {
                    respuesta.nextElementSibling.style.color = "red";
                }
            });
        } else {
            // Cambiar el color del texto del label
            if (respuestaSeleccionada.value === "correcta") {
                // Cambiar el color del label de la respuesta seleccionada a verde
                respuestaSeleccionada.nextElementSibling.style.color = "green";
                respuestasCorrectas++;
            } else {
                respuestasIncorrectas++;
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
        }

        document.getElementById("comprobar").style.display = "none";
    });
    // Declaramos la lista de intentos;
    let listaIntentos = JSON.parse(localStorage.getItem("intentos")) || [];

    // Listener para que cuando el Usuario decida terminar el examen, se debe crear el intento;
    this.document.getElementById("terminar").addEventListener("click", function () {

        // Mensaje de confirmacion para terminar el examen;
        let confirmacion = confirm("¿Está seguro que desea terminar su intento? (Su nota se guardará automáticamente y las preguntas no contestadas se darán por incorrectas)");

        if (confirmacion == true) {
            let fechaRealizacion = new Date().toLocaleDateString('es-ES')
            let examenSeleccionado = listaExamenes.find(examen => examen.numeroExamen == num);
        let totalPreguntas = examenSeleccionado.preguntas.length; // Número de preguntas en el examen
        let nota = (respuestasCorrectas / totalPreguntas) * 10; // Nota basada en el porcentaje de respuestas correctas


            let numIntento = 1;

            for (let i = 0; i < listaIntentos.length; i++) {
                if (listaIntentos[i].usuario == localStorage.getItem("usuario") && listaIntentos[i].examen == num) {
                    numIntento = listaIntentos[i].numeroIntentos + 1;
                }
            }
            let intento = new Intento(localStorage.getItem("usuario"), num, nota.toFixed(2), numIntento, fechaRealizacion);

            listaIntentos.push(intento);
            localStorage.setItem("intentos", JSON.stringify(listaIntentos));

            document.getElementsByTagName("header")[0].firstElementChild.style.display = "flex"
            document.getElementsByTagName("header")[0].lastElementChild.style.display = "flex";

            window.location.reload();
        }
    })
})