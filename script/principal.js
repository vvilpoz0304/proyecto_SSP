window.addEventListener("DOMContentLoaded", function () {
  let usuario = localStorage.getItem("usuario");

let rolLogueado;

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
