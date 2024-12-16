window.addEventListener("DOMContentLoaded", function () {
    //Conseguimos el array de usuarios del localStorage;
    let listaUsuarios = JSON.parse(localStorage.getItem("usuariosValidados"));

    let divRegistro = document.getElementById("registro");

    // Creamos esta función para escribir los datos del registro en una tabla con todos los datos;
    function escribirDatos() {
        for (let i = 1; i < listaUsuarios.length; i++) {
            let fila = document.createElement('tr'); // Creamos la fila por cada nuevo Usuario;

            // Creamos la columna para el boton on/off del checkbox
            let columnaCheckbox = document.createElement('td');
            let boton = document.createElement('div');
            boton.setAttribute('class', 'toggle');
            let check = document.createElement('input');
            check.setAttribute('class', 'check');
            check.setAttribute('type', 'checkbox');
            check.setAttribute('id', 'usuarioValidado' + i);
            if (listaUsuarios[i].validado === true) {
                check.setAttribute('checked', 'checked'); // Marcar el checkbox en caso de que ese usuario si esté validado;
            }
            let etiqueta = document.createElement('label');
            etiqueta.setAttribute('for', 'usuarioValidado' + i);
            boton.append(check, etiqueta);
            columnaCheckbox.append(boton);
            fila.append(columnaCheckbox);

            // Creamos columna con los inputs para los nombres (inputs editables para editar la información);
            let columnaNombre = document.createElement('td');
            let registroNombre = document.createElement('input');
            registroNombre.setAttribute("readonly", "true");
            registroNombre.value = listaUsuarios[i].nombre;
            columnaNombre.append(registroNombre);
            fila.append(columnaNombre);

            //  Creammos la columna con las contraseñas.
            let columnaContrasena = this.document.createElement('td');
            let registroContrasena = document.createElement('input');
            registroContrasena.setAttribute('id', 'contrasenaUsuario' + i);
            registroContrasena.value = listaUsuarios[i].contrasena;
            columnaContrasena.append(registroContrasena);
            fila.append(columnaContrasena);

            //  Creammos la columna con los roles.
            let columnaRol = this.document.createElement('td');
            let registroRol = document.createElement('select');
            registroRol.setAttribute('id', 'rolUsuario' + i);
            let rol1 = this.document.createElement('option');
            rol1.setAttribute('value', 'profesor')
            rol1.textContent = 'Profesor'
            let rol2 = this.document.createElement('option');
            rol2.setAttribute('value', 'estudiante')
            rol2.textContent = 'Estudiante';
            registroRol.append(rol1, rol2);

            registroRol.value = listaUsuarios[i].rol;
            columnaRol.append(registroRol);
            fila.append(columnaRol);

            // Creamos la columna donde va el botón de borrar;
            let columnaBorrar = document.createElement('td');
            let botonEliminar = document.createElement('button');
            let icono = document.createElement('img');
            icono.setAttribute("src", "images/icono_eliminar.png");
            icono.setAttribute('class', 'eliminar')
            icono.setAttribute('id', i)
            botonEliminar.setAttribute('class', 'eliminar');
            botonEliminar.append(icono);
            columnaBorrar.append(botonEliminar);
            fila.append(columnaBorrar);



            // Añadimos la fila a la tabla
            document.getElementById('registro').lastElementChild.append(fila);
        }
    }

    // Función para guardar los cambios realizados con los inputs del usuario.
    this.document.getElementById('save').addEventListener('click', function () {
        for (let i = 1; i < listaUsuarios.length; i++) {
            //Conseguimos los datos  que han sido cambiados;
            let validadoNuevo = document.getElementById('usuarioValidado' + i).checked;
            let nombreUsuario = listaUsuarios[i].nombre
            let contrasenaNueva = document.getElementById('contrasenaUsuario' + i).value;
            let rolNuevo = document.getElementById('rolUsuario' + i).value;

            // Actualizamos el array del localStorage;
            listaUsuarios[i] = {
                validado: validadoNuevo,
                nombre: nombreUsuario,
                contrasena: contrasenaNueva,
                rol: rolNuevo
            };

            localStorage.setItem('usuariosValidados', JSON.stringify(listaUsuarios));

        }
        // Mostramos un mensaje de éxito;
        let mensajeExito = document.createElement('p');
        mensajeExito.setAttribute('class', 'exito');
        mensajeExito.textContent = "Los datos han sido actualizado correctamente. =D";

        document.getElementsByTagName('main')[0].firstElementChild.nextElementSibling.after(mensajeExito);
    })

    escribirDatos(); // LLamamos a la función para escribir los datos;

    // Le añadimos funcionalidad al botón de eliminar, para ello le añado el listener a todo el div pero el evento solo 
    // se realizará en caso de hacer click a algún elemento con la clase "eliminar"
    this.document.getElementById('registro').addEventListener('click', function (event) {
        if (event.target.classList.contains('eliminar')) {
            let numeroUsuario = event.target.getAttribute('id');
            listaUsuarios.splice(numeroUsuario, 1);
            localStorage.setItem('usuariosValidados', JSON.stringify(listaUsuarios));
            window.location.reload();

        }
    })
})