class MensajesDTO {
    constructor({ id, author, title,comments}) {
        this.id = id,
        this.author = author,
        this.title = title,
        this.comments = comments

    }
}

let transformarADTO= function (mensajes) {
    if (Array.isArray(mensajes)) {
        return mensajes.map(p => new MensajesDTO(p))
    } else {
        return new MensajesDTO(mensajes)
    }
}

module.exports ={transformarADTO};