window.addEventListener('DOMContentLoaded', function () {

    let preguntasDeCategoria = [];
    let listaPreguntas = JSON.parse(this.localStorage.getItem('preguntas'));
    let num = 0;

    let listaCategorias = JSON.parse(localStorage.getItem('categorias')) || [];
    if (listaCategorias.length > 0) {
        let opcionEnBlanco = document.createElement('option');
        opcionEnBlanco.setAttribute("value", "...");
        opcionEnBlanco.textContent = "...";
        document.getElementsByTagName('select')[0].append(opcionEnBlanco);
        for (let i = 0; i < listaCategorias.length; i++) {
            let opcionCategorias = document.createElement('option');
            opcionCategorias.setAttribute("value", listaCategorias[i]);
            opcionCategorias.textContent = listaCategorias[i];
            document.getElementsByTagName('select')[0].append(opcionCategorias);
        }
    }

    let formPreguntas = document.getElementById("preguntas")
    let tabla = document.createElement("table");
    tabla.setAttribute("id", "tablaPreguntas")
    formPreguntas.append(tabla);

    let botonAnterior = this.document.createElement("button")
    let botonSiguiente = this.document.createElement("button")

    botonAnterior.setAttribute("id", "preguntaAnterior");
    botonAnterior.textContent = "Anterior"

    botonSiguiente.setAttribute("id", "preguntaSiguiente");
    botonSiguiente.textContent = "Siguiente"

    tabla.before(botonAnterior);
    tabla.after(botonSiguiente);

    // Listener para actualizar en el momento que se cambie la categoria
    document.getElementsByTagName('select')[0].addEventListener('input', function () {

        let categoriaSeleccionada = document.getElementsByTagName('select')[0].value;
        console.log(categoriaSeleccionada)
        preguntasDeCategoria = [];
        num = 0;

        for (let i = 0; i < listaPreguntas.length; i++) {
            if (listaPreguntas[i].categoria === categoriaSeleccionada) {
                preguntasDeCategoria.push(listaPreguntas[i]);
            }
        }

        if (preguntasDeCategoria.length > 0) {
            mostrarPregunta()
        } else {
            let advertencia = this.document.createElement('p');
            advertencia.textContent = "Aún no existen preguntas de esta categoría :("

            this.document.getElementById('preguntas').append(advertencia)
        }
    })

    function mostrarPregunta() {

        tabla.innerHTML = '';


        let filaEnunciado = document.createElement("tr")


        // Crear y añadir el texto de la pregunta
        let pregunta = document.createElement('p');
        pregunta.textContent = preguntasDeCategoria[num].enunciado;
        filaEnunciado.append(pregunta);

        let filaRespuestaCorrecta = document.createElement("tr")

        // Crear y añadir opción correcta
        let opcionCorrecta = document.createElement('input');
        opcionCorrecta.setAttribute("type", "checkbox");
        opcionCorrecta.setAttribute("id", "opcionCorrecta" + num);
        let labelCorrecta = document.createElement("label");
        labelCorrecta.setAttribute("for", "opcionCorrecta" + num);
        labelCorrecta.textContent = preguntasDeCategoria[num].respuestaCorrecta;

        filaRespuestaCorrecta.append(opcionCorrecta, labelCorrecta);


        let filaRespuestaIncorrecta1 = document.createElement("tr")


        // Crear y añadir primera opción incorrecta
        let opcionIncorrecta1 = document.createElement('input');
        opcionIncorrecta1.setAttribute("type", "checkbox");
        opcionIncorrecta1.setAttribute("id", "opcionIncorrecta1_" + num);
        let labelIncorrecta1 = document.createElement("label");
        labelIncorrecta1.setAttribute("for", "opcionIncorrecta1_" + num);
        labelIncorrecta1.textContent = preguntasDeCategoria[num].respuestaIncorrecta1;

        filaRespuestaIncorrecta1.append(opcionIncorrecta1, labelIncorrecta1);

        let filaRespuestaIncorrecta2 = document.createElement("tr")

        // Crear y añadir segunda opción incorrecta
        let opcionIncorrecta2 = document.createElement('input');
        opcionIncorrecta2.setAttribute("type", "checkbox");
        opcionIncorrecta2.setAttribute("id", "opcionIncorrecta2_" + num);
        let labelIncorrecta2 = document.createElement("label");
        labelIncorrecta2.setAttribute("for", "opcionIncorrecta2_" + num);
        labelIncorrecta2.textContent = preguntasDeCategoria[num].respuestaIncorrecta2;

        filaRespuestaIncorrecta2.append(opcionIncorrecta2, labelIncorrecta2);



        tabla.append(filaEnunciado, filaRespuestaCorrecta, filaRespuestaIncorrecta1, filaRespuestaIncorrecta2);
    }
})