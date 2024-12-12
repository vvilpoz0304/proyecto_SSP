window.addEventListener('DOMContentLoaded', function () {

    //Creamos el array con las preguntas en caso de que no haya.
    let listaPreguntas = JSON.parse(localStorage.getItem('preguntas')) || [];
    let listaCategorias = JSON.parse(localStorage.getItem('categorias')) || [];
    //Si el array del local Storage está vacio añadimos el array al localStorage
    if (listaPreguntas.length === 0) {
        localStorage.setItem('preguntas', JSON.stringify(listaPreguntas));
    }

    if (listaCategorias.length > 0) {
        for (let i = 0; i < listaCategorias.length; i++) {
            let opcionCategorias = document.createElement('option');
            opcionCategorias.setAttribute("value", listaCategorias[i]);
            opcionCategorias.textContent = listaCategorias[i];
            document.getElementsByTagName('select')[0].append(opcionCategorias);
        }
    }

    // Funcion para el boton añadir
    document.getElementById('crearPregunta').addEventListener('click', function () {
        //Recogemos los datos;
        let enunciado = document.getElementById('creador').firstElementChild.nextElementSibling.value;
        let respuestaCorrecta = document.getElementById('creador').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.value;
        let respuestaIncorrecta1 = document.getElementById('creador').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value;
        let respuestaIncorrecta2 = document.getElementById('creador').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value;
        let categoria = document.getElementById('creador').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value;
        let dificultad = document.getElementById('creador').lastElementChild.previousElementSibling.value;

        //Creamos la instancia de pregunta;
        let pregunta = new Pregunta();
        pregunta.setPregunta(enunciado, respuestaCorrecta, respuestaIncorrecta1, respuestaIncorrecta2, categoria, dificultad);
        console.log(pregunta);
        //Añadimos la pregunta al array
        listaPreguntas.push(pregunta);

        //Actualizamos el local Storage
        localStorage.setItem('preguntas', JSON.stringify(listaPreguntas));
    });


});
