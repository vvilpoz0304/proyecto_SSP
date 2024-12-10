class Pregunta{
    constructor(){
        this.enunciado = "";
        this.respuestaCorrecta = "";
        this.respuestaIncorrecta1 = "";
        this.respuestaIncorrecta2 = "";
        this.categoria = "";
        this.dificultad = "";
    }
    setPregunta(enunciado, respuestaCorrecta, respuestaIncorrecta1, respuestaIncorrecta2, categoria, dificultad){
        this.enunciado = enunciado;
        this.respuestaCorrecta = respuestaCorrecta;
        this.respuestaIncorrecta1 = respuestaIncorrecta1;
        this.respuestaIncorrecta2 = respuestaIncorrecta2;
        this.categoria = categoria;
        this.dificultad = dificultad;
    }
}