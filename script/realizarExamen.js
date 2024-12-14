///////////////////////////////////////////////
//// Para mostrar la realizacion de examen ////
///////////////////////////////////////////////

let tabla = this.document.createElement("table");
let numeroPregunta = 1;


function mostrarPregunta(listaExamenes, numero) {
    tabla.innerHTML = ""; // Limpiamos la tabla cada vez que se muestre una pregunta

    // Declaramos una fila para el enunciado
    let filaEnunciado = document.createElement("tr");

    // Crear y añadir el texto de la pregunta
    let pregunta = document.createElement("p");
    pregunta.textContent = numeroPregunta + ".- " + listaExamenes[numero].preguntas[0].enunciado;
    filaEnunciado.append(pregunta);

    // Añadir la fila del enunciado 
    tabla.append(filaEnunciado);

    // A la hora de mostrar las preguntas en un examen quiero randomizar las respuestas para que la respuesta correcta no salga siempre en el mismo lugar
    // para eso meto las 3 respuestas en un array y las pongo en sitios aleaatorios con un algoritmo sort
    let respuestas = [
        // Para saber cual es la correcta se lo declaramos con "esCorrecta"
        { texto: listaExamenes[numero].preguntas[0].respuestaCorrecta, esCorrecta: true },
        { texto: listaExamenes[numero].preguntas[0].respuestaIncorrecta1, esCorrecta: false },
        { texto: listaExamenes[numero].preguntas[0].respuestaIncorrecta2, esCorrecta: false },
    ];

    // Randomizar el array de respuestas
    respuestas = respuestas.sort(() => Math.random() - 0.5);

    // Crear y añadir las filas para las respuestas randomizadas
    respuestas.forEach((respuesta, i) => {
        let filaRespuesta = document.createElement("tr");

        let opcion = document.createElement("input");
        opcion.setAttribute("type", "radio");
        opcion.setAttribute("name", "pregunta" + numeroPregunta);
        if (respuesta.esCorrecta) {
            opcion.setAttribute("value", "correcta");
        } else {
            opcion.setAttribute("value", `falsa`);
        }

        let label = document.createElement("label");
        label.setAttribute("for", `opcion_${i}_${numero}`);
        label.textContent = respuesta.texto;

        filaRespuesta.append(opcion, label);
        tabla.append(filaRespuesta);
    });

    document.getElementById("preguntaAnterior").after(tabla);
    numeroPregunta++;
}


/*
document.getElementById("preguntaSiguiente").addEventListener("click", function () {
    if (num < preguntasDeCategoria.length - 1) {
        num++;
        mostrarPregunta(num);
    } else {
        num = 0;
        mostrarPregunta(num);
    }
});

// Función para pasar a la pregunta anterior, en este caso utilizando un indice;
document.getElementById("preguntaAnterior").addEventListener("click", function () {
    if (num <= 0) {
        num = preguntasDeCategoria.length - 1;
        mostrarPregunta(num);
    } else {
        num--;
        mostrarPregunta(num);
    }
        
});

*/