window.addEventListener("DOMContentLoaded", function () {

  let usuario = localStorage.getItem("usuario"); // Conseguimos el nombre del usuario registrado
  let rolLogueado; // Declaramos un variable para posteriormente guardar el rol del usuario logueado

  let lista = JSON.parse(localStorage.getItem("usuariosValidados"));
  for(let i = 0; i < lista.length; i++){
    if(lista[i].nombre == usuario){
      rolLogueado = lista[i].rol;
    }
  }

  // Mostrar paneles según rol
  if(rolLogueado == "admin"){
    mostrarAdmin();
  } else if(rolLogueado == "profesor"){
    mostrarProfe();
  } else if(rolLogueado == "alumno"){
    mostrarAlumno();
  }

  // Redireccion a "Validar Usuarios";
  this.document.getElementById("panelAdmin").firstElementChild.addEventListener('click', function(){
    window.location.href = "validarUsuarios.html";
  })

  // Redirecciones de las funcionalidades del panel de profesores;
  this.document.getElementById("panelProf").firstElementChild.addEventListener('click', function(){
    window.location.href = "crearPregunta.html"
  })
  this.document.getElementById("panelProf").firstElementChild.nextElementSibling.addEventListener('click', function(){
    window.location.href = "gestionarCategorias.html"
  })
  this.document.getElementById("panelProf").lastElementChild.previousElementSibling.addEventListener('click', function(){
    window.location.href = "generarExamen.html"
  })
  this.document.getElementById("panelProf").lastElementChild.addEventListener('click', function(){
    window.location.href = "verResultados.html"
  })
  //Redirecciones de las funcionalidades del panel de Alumnos;
  this.document.getElementById("panelAlum").firstElementChild.addEventListener('click', function(){
    window.location.href = "realizarExamen.html"
  })
  this.document.getElementById("panelAlum").firstElementChild.nextElementSibling.addEventListener('click', function(){
    window.location.href = "repetirExamen.html"
  })
  this.document.getElementById("panelAlum").lastElementChild.addEventListener('click', function(){
    window.location.href = "verResultados.html"
  })



// Funciones para ocultar/mostrar los areas de los diferentes roles yu establecer los fondos de dichas páginas.
  function mostrarAdmin() {
    document.getElementById("panelAdmin").style.display = "flex";
    document.getElementById("panelProf").style.display = "flex";
    document.body.style.backgroundImage = "url('../images/fondo_admin.webp')"
    document.body.style.backgroundSize = "cover"; 
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
  }

  function mostrarProfe() {
    document.getElementById("panelAdmin").style.display = "none";
    document.getElementById("panelProf").style.display = "flex";
    document.body.style.backgroundImage = "url('../images/fondo_prof.webp')"
    document.body.style.backgroundSize = "cover"; 
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    
  }
  function mostrarAlumno() {
    document.getElementById("panelAdmin").style.display = "none";
    document.getElementById("panelProf").style.display = "none";
    document.body.style.backgroundImage = "url('../images/fondo_alum.webp')"
    document.body.style.backgroundSize = "cover"; 
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
  }
});
