window.addEventListener("DOMContentLoaded", function(){
    let listaUsuarios = JSON.parse(localStorage.getItem("usuariosValidados"));

//    alert(listaUsuarios[0])

    alert(listaUsuarios.length);

    for(let i = 1; i < listaUsuarios.length; i++){
        let check = document.createElement('input');
        check.setAttribute('type', 'checkbox');
        if(listaUsuarios[i].validado == true){
            check.checked = true;
        } else check.checked = false;
        let registro = document.createElement('p');
        registro.textContent = listaUsuarios[i].nombre;
        document.getElementById('registro').lastElementChild.append(check, registro);
    }
})