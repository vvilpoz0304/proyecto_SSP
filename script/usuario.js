class Usuario{
    constructor(){
        this.nombre = "";
        this.contrasena = "";
        this.rol = "";
        this.validado = false;
    }
    setUsuario(nombre, contrasena, rol, validado){
        this.nombre = nombre;
        this.contrasena = contrasena;
        this.rol = rol;
        this.validado = validado;;
    }
}

