window.addEventListener('DOMContentLoaded', function(){

    let listaPreguntas = JSON.parse(this.localStorage.getItem('preguntas'));
    let num = 0;

    function mostrarPregunta(){
    let pregunta = this.document.createElement('p');
    pregunta.textContent = listaPreguntas[0].enunciado
    console.log(listaPreguntas[0].enunciado);
    let select = this.document.createElement('select');
    let opcionCorrecta = this.document.createElement('option');
    opcionCorrecta.textContent = listaPreguntas[num].respuestaCorrecta;
    let opcionIncorrecta1 = this.document.createElement('option');
    opcionIncorrecta1.textContent = listaPreguntas[num].opcionIncorrecta1
    let opcionIncorrecta2 = this.document.createElement('option');
    opcionIncorrecta2.textContent = listaPreguntas[num].opcionIncorrecta2

    console.log(listaPreguntas[num].respuestaCorrecta, listaPreguntas[num].opcionIncorrecta1, listaPreguntas[num].opcionIncorrecta2);
    }

    
})