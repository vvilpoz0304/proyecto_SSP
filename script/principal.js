window.addEventListener("DOMContentLoaded", function () {

  let usuario = localStorage.getItem("usuario"); // Conseguimos el nombre del usuario registrado
  let rolLogueado; // Declaramos un variable para posteriormente guardar el rol del usuario logueado

  let lista = JSON.parse(localStorage.getItem("usuariosValidados"));
  for(let i = 0; i < lista.length; i++){
    if(lista[i].nombre == usuario){
      rolLogueado = lista[i].rol;
    }
  }
  if(rolLogueado == "admin"){
    mostrarAdmin();
  } else if(rolLogueado == "profesor"){
    mostrarProfe();
  } else if(rolLogueado == "alumno"){
    mostrarAlumno();
  }


// Funciones para ocultar/mostrar los areas de los diferentes roles
  function mostrarAdmin() {
    document.getElementById("panelAdmin").style.display = "flex";
    document.getElementById("panelProf").style.display = "flex";
  }

  function mostrarProfe() {
    document.getElementById("panelAdmin").style.display = "none";
    document.getElementById("panelProf").style.display = "flex";
  }
  function mostrarAlumno() {
    document.getElementById("panelAdmin").style.display = "none";
    document.getElementById("panelProf").style.display = "none";
  }
});
