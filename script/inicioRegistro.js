window.addEventListener("DOMContentLoaded", function () {
  //Estas funciones son para ocultar/mostrar los div del inicio de sesion o registro al momento de hacer click
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

  // Función para que en caso de que no haya ningun array con los usuarios, crea uno donde estará el usuairo Admin
  // De esta manera el usuario admin estará siempre creado.
  function listaUsuarios() {
    let lista = JSON.parse(localStorage.getItem("usuariosValidados"));
    if (!lista) {
      lista = [];
      let admin = new Usuario();
      admin.setUsuario("admin", "admin", "admin", true);
      lista.push(admin);
      let yo = new Usuario();
      yo.setUsuario("Valentin", "kiko", "profesor", true);
      lista.push(yo);
      localStorage.setItem("usuariosValidados", JSON.stringify(lista));
    } else {
      lista = JSON.parse(localStorage.getItem("usuariosValidados"));
    }
  }
  // Ejecutamos esta función para que siempre la lista este creada (sino en caso de borrar la lista del localStorage la primera vez que intentes acceder dará un error
  // a no ser que recargues);
  listaUsuarios();
  let mensajeError = this.document.getElementById("mensaje");
  lista = JSON.parse(this.localStorage.getItem("usuariosValidados"));

  // Función para comprobar que los datos corresponden a un usuario
  document.getElementById("acceder").addEventListener("submit", function (e) {
    listaUsuarios();
    e.preventDefault(); // Para evitar problemas con el submit y que los datos se manden correctamente;
    nombreUsuario = document.getElementById("usuario").value;
    contrasena = document.getElementById("contrasenaInicio").value;
    for (let i = 0; i < lista.length; i++) {
      //Bucle para recorrer el array de objetos con los usuarios
      if (lista[i].nombre == nombreUsuario && lista[i].contrasena == contrasena) {
        if (lista[i].validado == true) {
          // En caso de que coincida el nombre de usuario y su contraseña, el usuario será redirigido a la página principal
          localStorage.setItem("usuario", lista[i].nombre);
          window.location.href = "home.html";
        } else {
          // En caso de que no coincidan los credenciales, mostrará un mensaje de error;
          if (mensajeError == null) {
            // En caso de que no exista el elemento con el mensaje de error, lo creará, sino lo reescríbira;
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
let mensajeContrasena = this.document.getElementById("mensaje");

this.document
  .getElementById("registrarse")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    listaUsuarios();
    let lista = JSON.parse(localStorage.getItem("usuariosValidados"));

    nombreNuevo = document.getElementById("nombre").value;
    contrasenaNueva = document.getElementById("contrasenaRegistro").value;
    rolNuevo = document.getElementById("rol").value;

    // Eliminar mensajes de error previos
    let mensajesPrevios = document.querySelectorAll("#registrarse p");
    mensajesPrevios.forEach((msg) => msg.remove());

    // Comprobar si el nombre ya existe en la lista
    let existeUsuario = lista.some(usuario => usuario.nombre === nombreNuevo);

    if (existeUsuario) {
      // Mostrar un mensaje de error si el nombre ya existe
      let mensajeError = document.createElement('p');
      mensajeError.textContent = "El nombre de usuario ya está registrado.";
      mensajeError.style.color = 'red';
      document.getElementById('registrarse').append(mensajeError);
    } else {
      // Si el usuario no existe, validar campos vacíos
      if (nombreNuevo == null || nombreNuevo.trim() === "" || contrasenaNueva == null || contrasenaNueva.trim() === "") {
        let mensajeError = document.createElement('p');
        mensajeError.textContent = "Los campos no pueden estar vacíos.";
        mensajeError.style.color = 'red';
        document.getElementById('registrarse').append(mensajeError);
      } else {
        // Validar la contraseña
        if (validarContrasena(contrasenaNueva)) {
          // Crear un nuevo usuario si todo está correcto
          let nuevoUsuario = new Usuario();
          nuevoUsuario.setUsuario(nombreNuevo, contrasenaNueva, rolNuevo, false);
          lista.push(nuevoUsuario);
          localStorage.setItem("usuariosValidados", JSON.stringify(lista));

          // Limpiar campos
          document.getElementById("nombre").value = "";
          document.getElementById("contrasenaRegistro").value = "";
        } else {
          // Mensaje de error de contraseña
          let mensajeContrasena = document.createElement('p');
          mensajeContrasena.textContent = "La contraseña debe tener entre 8 y 16 caracteres, mayúsculas, minúsculas y símbolos.";
          mensajeContrasena.style.color = "red";
          document.getElementById("registrarse").append(mensajeContrasena);
        }
      }
    }
  });

// Función para validar la contraseña
function validarContrasena(contrasenaUsuario) {
  let tieneMayusculas = false;
  let suficientes = false;
  let tieneMinusculas = false;
  let tieneNumeros = false;
  let tieneSimbolos = false;
  let simbolos = "-_@#$&%";

  // Verificar cada carácter de la contraseña
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
    if (contrasenaUsuario[char] >= "0" && contrasenaUsuario[char] <= "9") {
      tieneNumeros = true;
    }
    if (simbolos.includes(contrasenaUsuario[char])) {
      tieneSimbolos = true;
    }
  }

  // Si todos los requisitos se cumplen
  if (
    tieneNumeros &&
    tieneMayusculas &&
    tieneMinusculas &&
    tieneSimbolos &&
    suficientes
  ) {
    return true;
  }

  // Si no cumple, retorna false
  return false;
}

});
