class UsuariosDTO {
    constructor({ username, password, direccion,contador}) {
        this.username = username,
        this.password = password,
        this.direccion = direccion,
        this.contador = contador

    }
}

let transformarADTO3= function (usuarios) {
    if (Array.isArray(usuarios)) {
        return usuarios.map(p => new UsuariosDTO(p))
    } else {
        return new UsuariosDTO(usuarios)
    }
}

module.exports ={transformarADTO3};