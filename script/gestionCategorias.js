window.addEventListener("DOMContentLoaded", function () {
  // Conseguimos el array de categorias;
  let listaCategorias = JSON.parse(localStorage.getItem("categorias")) || [];

  //Si el array del local Storage está vacio añadimos el array al localStorage;
  if (listaCategorias.length === 0) {
    localStorage.setItem("categorias", JSON.stringify(listaCategorias));
  }

  // eEclaramos la tabla y la añadimos en el html;
  // Crear el contenedor para la tabla
  let tablaContainer = document.createElement("div");
  tablaContainer.classList.add("table-container");

  // Crear la tabla y añadirla al contenedor
  let tabla = this.document.createElement("table");
  tablaContainer.appendChild(tabla);

  // Añadir el contenedor de la tabla después del listado de categorías
  document.getElementById("listadoCategorias").after(tablaContainer);


  //Recorremos el array del LocalStorage para ir escribiendolos en la tabla
  for (let i = 0; i < listaCategorias.length; i++) {
    let fila = this.document.createElement("tr");

    let columnaCategoria = this.document.createElement("td");
    let nombreCategoria = this.document.createElement("input");
    nombreCategoria.setAttribute("id", "nombreCategoria" + i)
    nombreCategoria.setAttribute("readonly", "true");
    nombreCategoria.setAttribute("type", "text");
    nombreCategoria.value = listaCategorias[i];
    columnaCategoria.append(nombreCategoria);
    fila.append(columnaCategoria);

    let columnaBorrar = document.createElement("td");
    let botonEliminar = document.createElement("button");
    let icono = document.createElement("img");
    icono.setAttribute("src", "images/icono_eliminar.png");
    icono.setAttribute("class", "eliminar");
    icono.setAttribute("id", i);
    botonEliminar.setAttribute("class", "eliminar");
    botonEliminar.append(icono);
    columnaBorrar.append(botonEliminar);
    fila.append(columnaBorrar);
    this.document.getElementsByTagName("table")[0].append(fila);
  }
  // Boton para guardar los cambios
  let botonGuardar = this.document.createElement("button");
  botonGuardar.setAttribute("id", "save");
  botonGuardar.textContent = "Guardar Cambios";
  this.document.getElementsByTagName("table")[0].after(botonGuardar);

  //Funcion para añdir registros de categorias.
  this.document.getElementById("anadir").addEventListener("click", function () {
    let nuevaCategoria =
      document.getElementById("listadoCategorias").firstElementChild.value;

    listaCategorias.push(nuevaCategoria);

    localStorage.setItem("categorias", JSON.stringify(listaCategorias));
    window.location.reload(); //Recargamos la página para actualizar la tabla;
  });

  //Funcion para borrar registros de categorias.
  this.document.getElementsByTagName("main")[0].addEventListener("click", function (event) {
    if (event.target.classList.contains("eliminar")) {
      let nombreCategoria = event.target.getAttribute("id");
      listaCategorias.splice(nombreCategoria, 1);
      localStorage.setItem("categorias", JSON.stringify(listaCategorias));
      window.location.reload();
    }
  });

  this.document.getElementById('save').addEventListener('click', function () {
    for (let i = 0; i < listaCategorias.length; i++) {

      //Conseguimos los datos  que han sido cambiados;
      let categoriaNueva = document.getElementById('nombreCategoria' + i).value;

      // Actualizamos el array del localStorage;
      listaCategorias[i] = categoriaNueva;

      localStorage.setItem('categorias', JSON.stringify(listaCategorias));

    }
  });
});
