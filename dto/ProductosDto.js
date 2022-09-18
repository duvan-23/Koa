class ProductosDTO {
    constructor({ id, nombre, precio,foto}) {
        this.id = id,
        this.nombre = nombre,
        this.precio = precio,
        this.foto = foto

    }
}

let transformarADTO2= function (productos) {
    if (Array.isArray(productos)) {
        return productos.map(p => new ProductosDTO(p))
    } else {
        return new ProductosDTO(productos)
    }
}

module.exports ={transformarADTO2};