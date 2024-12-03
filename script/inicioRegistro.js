window.addEventListener("DOMContentLoaded", function () {
  this.document
    .getElementById("registro")
    .addEventListener("click", function () {
      document.getElementById("signIn").style.display = "none";
      document.getElementById("signUp").style.display = "flex";
    });
  this.document.getElementById("inicio").addEventListener("click", function () {
    document.getElementById("signUp").style.display = "none";
    document.getElementById("signIn").style.display = "flex";
  });

  /////////////////////////////
  /// Para inicio de sesion ///
  /////////////////////////////

  let nombreUsuario;
  let contrasena;
  let users = [];

  function listaUsuarios() {
    let lista = localStorage.getItem("usuariosValidados");
    if (lista == null || lista == undefined) {
      let admin = new Usuario();
      admin.setUsuario("admin", "admin", "admin", true);
      users.push(admin);
      localStorage.setItem("usuariosValidados", JSON.stringify(users));
    } else {
      users = JSON.parse(lista);
    }
  }

  listaUsuarios();
  let mensajeError = this.document.getElementById("mensaje");
  console.log(mensajeError);
  users = JSON.parse(this.localStorage.getItem("usuariosValidados"));

  // Función para comprobar que los datos corresponden a un usuario
  document.getElementById("acceder").addEventListener("submit", function (e) {
    e.preventDefault();
    nombreUsuario = document.getElementById("usuario").value;
    contrasena = document.getElementById("contrasenaInicio").value;
    let red = false;
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].nombre == nombreUsuario &&
        users[i].contrasena == contrasena
      ) {
        if (users[i].validado == true) {
          localStorage.setItem("usuario", users[i].nombre);
          window.location.href = "home.html";
        } else {
          if (mensajeError == null) {
            mensajeError = document.createElement("p");
            let p = document
              .querySelector("#acceder")
              .getElementsByTagName("p");
            p.id = "mensaje";
            mensajeError.innerHTML = `El usuario introducido no está válidado o no está registrado.`;
            mensajeError.style.color = "red";
            document.getElementById("acceder").append(mensajeError);
          } else
            mensajeError.innerHTML = `El usuario introducido no está válidado o no está registrado.`;
        }
      } else {
        if (mensajeError == null) {
          mensajeError = document.createElement("p");
          let p = document.querySelector("#acceder").getElementsByTagName("p");
          p.id = "mensaje";
          mensajeError.innerHTML = `Usuario o contraseña incorrectos.`;
          mensajeError.style.color = "red";
          document.getElementById("acceder").append(mensajeError);
          console.log(mensajeError);
        } else mensajeError.innerHTML = `Usuario o contraseña incorrectos.`;
      }
    }
  });

  /////////////////////////
  /// Para el registro  ///
  /////////////////////////

  let nombreNuevo;
  let contrasenaNueva;
  let rolNuevo;
  let usuariosParaValidar = [];
  let mensajeContrasena = this.document.getElementById("mensaje");


  this.document
    .getElementById("registrarse")
    .addEventListener("submit", function () {
      let listaNo = localStorage.getItem("usuariosNoValidados");

      if (listaNo == null || listaNo == undefined) {
        localStorage.setItem("usuariosNoValidados", usuariosParaValidar);
      }

      nombreNuevo = document.getElementById("nombre").value;
      contrasenaNueva = document.getElementById("contrasenaRegistro").value;
      rolNuevo = document.getElementById("rol").value;

      if (mensajeContrasena == null) {
        mensajeContrasena = document.createElement("p");
        let p = document.querySelector("#registrarse").getElementsByTagName("p");
        p.id = "mensaje";
      }

      if (validarContrasena(contrasenaNueva)) {
        let nuevoUsuario = new Usuario();
        nuevoUsuario.setUsuario(nombreNuevo, contrasenaNueva, rolNuevo, false);
        usuariosParaValidar.push(nuevoUsuario);
        localStorage.setItem("usuariosNoValidados", JSON.stringify(usuariosParaValidar));
      } else{
        mensajeContrasena.innerHTML = `La contraseña debe tener entre 8 y 16 caracteres, mayus, minus y símbolos`;
      mensajeContrasena.style.color = "red";
      document.getElementById("registrarse").append(mensajeContrasena);
      console.log(mensajeContrasena);
      }
    });

  function validarContrasena(contrasenaUsuario) {
    let tieneMayusculas = false;
    let suficientes = false;
    let tieneMinusculas = false;
    let tieneNumeros = false;
    let tieneSimbolos = false;
    let simbolos = "-_@#$&%";

    for (let char = 0; char < contrasenaUsuario.length; char++) {
      if (contrasenaUsuario.length >= 8 && contrasenaUsuario.length <= 16) {
        suficientes = true;
      }
      if (contrasenaUsuario[char] >= "A" && contrasenaUsuario[char] <= "Z") {
        tieneMayusculas = true;
      }
      if (contrasenaUsuario[char] >= "a" && contrasenaUsuario[char] <= "z") {
        tieneMinusculas = true;
      }
      if (contrasenaUsuario[char] >= 0 && contrasenaUsuario[char] <= 9) {
        tieneNumeros = true;
      }
      if (simbolos.includes(contrasenaUsuario[char])) {
        tieneSimbolos = true;
      }
    }

    if (suficientes == true) {
    }
    if (tieneMayusculas == true) {
    }
    if (tieneMinusculas == true) {
    }
    if (tieneSimbolos == true) {
    }
    if (
      tieneNumeros &&
      tieneMayusculas &&
      tieneMinusculas &&
      tieneSimbolos &&
      suficientes
    ) {
      mensajeContrasena.innerHTML = `Usuario Registrado`;
      mensajeContrasena.style.color = "green";
      document.getElementById("registrarse").append(mensajeContrasena);
      console.log(mensajeContrasena);
      return true;
    }
  }
});
