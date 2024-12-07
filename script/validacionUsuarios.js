window.addEventListener("DOMContentLoaded", function () {
    let listaUsuarios = JSON.parse(localStorage.getItem("usuariosValidados"));

    let divRegistro = document.getElementById("registro");
    //    alert(listaUsuarios[0])


    function escribirDatos() {
        for (let i = 1; i < listaUsuarios.length; i++) {
            let fila = document.createElement('tr');

            //Columna para el checkbox (Validado/No Validado)
            let columnaCheckbox = document.createElement('td');
            // anadir_boton_registro(i);
            let boton = document.createElement('div');
            boton.setAttribute('class', 'toggle');
            let check = document.createElement('input');
            check.setAttribute('class', 'check');
            check.setAttribute('type', 'checkbox');
            check.setAttribute('id', i);
            if (listaUsuarios[i].validado === true) {
                check.setAttribute('checked', 'checked'); // Marcar el checkbox
            }
            let etiqueta = document.createElement('label');
            etiqueta.setAttribute('for', i);
            boton.append(check, etiqueta);
            columnaCheckbox.append(boton);
            fila.append(columnaCheckbox);

            let columnaNombre = document.createElement('td');
            let registroNombre = document.createElement('input');
            registroNombre.setAttribute('id', 'nombreUsuario' + i);
            registroNombre.value = listaUsuarios[i].nombre;
            columnaNombre.append(registroNombre);
            fila.append(columnaNombre);

            let columnaContrasena = this.document.createElement('td');
            let registroContrasena = document.createElement('input');
            registroContrasena.setAttribute('id', 'contrasenaUsuario' + i);
            registroContrasena.value = listaUsuarios[i].contrasena;
            columnaContrasena.append(registroContrasena);
            fila.append(columnaContrasena);

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


            document.getElementById('registro').lastElementChild.append(fila);
        }
    }

    escribirDatos();
})