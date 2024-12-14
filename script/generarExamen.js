   window.addEventListener("DOMContentLoaded", function () {
  //Declaramos el array donde vamos a guardar las preguntas de la categoria elegida;
  let preguntasDeCategoria = [];

  //Declaramos el array de examenes;
  let listaExamenes = JSON.parse(localStorage.getItem("examenes")) || [];


  let listaPreguntas = JSON.parse(this.localStorage.getItem("preguntas"));

  // Variable que vamos a tomar como indice;
  let num = 0;

  let listaCategorias = JSON.parse(localStorage.getItem("categorias")) || [];

  // Creamos lla tabla donde vamos a mostrar la pregunta para añadir o no;
  let formPreguntas = document.getElementById("preguntas");
  let tabla = document.createElement("table");
  tabla.setAttribute("id", "tablaPreguntas");
  formPreguntas.append(tabla);

  // Creamos los botones para ppoder pasar a la siguiente y anterior pregunta;
  let botonAnterior = this.document.createElement("button");
  let botonSiguiente = this.document.createElement("button");
  let imagenAtras = this.document.createElement("img");
  let imagenAdelante = this.document.createElement("img");

  imagenAtras.setAttribute("src", "images/atras.png")
  imagenAdelante.setAttribute("src", "images/adelante.png")

  botonAnterior.setAttribute("id", "preguntaAnterior");
  botonAnterior.append(imagenAtras);

  botonSiguiente.setAttribute("id", "preguntaSiguiente");
  botonSiguiente.append(imagenAdelante)

  // Ocultamos los botones para que no salgan nada más cargar las páginas;
  botonAnterior.style.display = "none";
  botonSiguiente.style.display = "none";

  //Añadimos los botones antes y despues de la tabla;
  tabla.before(botonAnterior);
  tabla.after(botonSiguiente);


  // Creamos el select con las opciones que son las categorias;
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

  // Listener para actualizar en el momento que se cambie la categoria;
  document.getElementsByTagName("select")[0].addEventListener("input", function () {
    //Mostramos los botones al elegir una categoria;
    botonAnterior.style.display = "block";
    botonSiguiente.style.display = "block";
    // Conseguimos la categoria que ha sido elegida
    let categoriaSeleccionada = document.getElementsByTagName("select")[0].value;
    preguntasDeCategoria = []; // Limpiamos el array por si se cambia de categoria;
    num = 0; // Ponemos indice 0 por si se ha cambiado de categoria;
    // Metemos todas las preguntas de la categoria seleccionada en un array creado con las preguntas de la categoria seleccionada;
    for (let i = 0; i < listaPreguntas.length; i++) {
      if (listaPreguntas[i].categoria === categoriaSeleccionada) {
        preguntasDeCategoria.push(listaPreguntas[i]);
      }
    }
    console.log(preguntasDeCategoria.length);
    // Si existe alguna pregunta de la categoria seleccionada, llama a la funcion que escribe la pregunta;
    if (preguntasDeCategoria.length > 0) {
      mostrarPregunta(num);
    } else {
      botonAnterior.style.display = "none";
      botonSiguiente.style.display = "none";
      // Si no hay preguntas de esa categoría, muestra un mensaje
      document.getElementById("tablaPreguntas").innerHTML = ""; // Limpia el contenedor de preguntas
      let advertencia = document.createElement("p");
      advertencia.textContent =
        "Aún no existen preguntas de esta categoría :(";
      document.getElementById("preguntas").before(advertencia); // Añade el mensaje de advertencia
    }
  });

  //Función para escribir las preguntas
  function mostrarPregunta(numero) {
    tabla.innerHTML = ""; // Limpiamos la tabla cada vez que se muestre una pregunta

    // Declaramos una fila para el enunciado, otra para la respuesta coorecta y otras 2 para las incorrectas;
    let filaEnunciado = document.createElement("tr");

    // Crear y añadir el texto de la pregunta
    let pregunta = document.createElement("p");
    pregunta.textContent = preguntasDeCategoria[numero].enunciado;
    filaEnunciado.append(pregunta);

    let filaRespuestaCorrecta = document.createElement("tr");

    // Crear y añadir opción correcta
    let opcionCorrecta = document.createElement("input");
    opcionCorrecta.setAttribute("type", "checkbox");
    opcionCorrecta.checked = "true";
    opcionCorrecta.setAttribute("id", "opcionCorrecta" + numero);
    opcionCorrecta.setAttribute("onclick", "return false;");
    let labelCorrecta = document.createElement("label");
    labelCorrecta.setAttribute("for", "opcionCorrecta" + numero);
    labelCorrecta.textContent = preguntasDeCategoria[numero].respuestaCorrecta;

    filaRespuestaCorrecta.append(opcionCorrecta, labelCorrecta);

    let filaRespuestaIncorrecta1 = document.createElement("tr");

    // Crear y añadir primera opción incorrecta
    let opcionIncorrecta1 = document.createElement("input");
    opcionIncorrecta1.setAttribute("type", "checkbox");
    opcionIncorrecta1.setAttribute("id", "opcionIncorrecta1_" + numero);
    opcionIncorrecta1.setAttribute("onclick", "return false;");
    let labelIncorrecta1 = document.createElement("label");
    labelIncorrecta1.setAttribute("for", "opcionIncorrecta1_" + numero);
    labelIncorrecta1.textContent = preguntasDeCategoria[numero].respuestaIncorrecta1;

    filaRespuestaIncorrecta1.append(opcionIncorrecta1, labelIncorrecta1);

    let filaRespuestaIncorrecta2 = document.createElement("tr");

    // Crear y añadir segunda opción incorrecta
    let opcionIncorrecta2 = document.createElement("input");
    opcionIncorrecta2.setAttribute("type", "checkbox");
    opcionIncorrecta2.setAttribute("id", "opcionIncorrecta2_" + numero);
    opcionIncorrecta2.setAttribute("onclick", "return false;");
    let labelIncorrecta2 = document.createElement("label");
    labelIncorrecta2.setAttribute("for", "opcionIncorrecta2_" + numero);
    labelIncorrecta2.textContent = preguntasDeCategoria[numero].respuestaIncorrecta2;

    filaRespuestaIncorrecta2.append(opcionIncorrecta2, labelIncorrecta2);

    // Añadimos la informacion en la tabla
    tabla.append(filaEnunciado, filaRespuestaCorrecta, filaRespuestaIncorrecta1, filaRespuestaIncorrecta2);
  }

  // Función para pasar a la siguiente pregunta, en este caso utilizando un indice;
  this.document.getElementById("preguntaSiguiente").addEventListener("click", function () {
    if (num < preguntasDeCategoria.length - 1) {
      num++;
      mostrarPregunta(num);
    } else {
      num = 0;
      mostrarPregunta(num);
    }
  });

  // Función para pasar a la pregunta anterior, en este caso utilizando un indice;
  this.document.getElementById("preguntaAnterior").addEventListener("click", function () {
    if (num <= 0) {
      num = preguntasDeCategoria.length - 1;
      mostrarPregunta(num);
    } else {
      num--;
      mostrarPregunta(num);
    }
  });

  let preguntasDeExamen = [];
  // Funcion para añadir la pregunta mostrada en un array de examenes
  this.document.getElementById("anadir").addEventListener("click", function () {
    preguntasDeExamen.push(preguntasDeCategoria[num]);
  });
  // Funcion para añadir el array del examen con las preguntas al localStorage
  this.document.getElementById("terminar").addEventListener("click", function () {
    let numeroDeExamenes = listaExamenes.length;
    let fechaExamen = document.getElementById("formExamen").firstElementChild.nextElementSibling.value;
    let categoriaSeleccionada = document.getElementsByTagName("select")[0].value;
    let examenNuevo = new Examen(numeroDeExamenes, fechaExamen, categoriaSeleccionada, preguntasDeExamen);

   // console.log(numeroDeExamenes, fechaExamen, categoriaSeleccionada, examenNuevo)
   listaExamenes.push(examenNuevo)
   localStorage.setItem("examenes", JSON.stringify(listaExamenes))
    preguntasDeExamen = [];
    
  });
});
