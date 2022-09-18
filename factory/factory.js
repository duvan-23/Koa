const { transformarADTO}=require( "../dto/MensajesDto.js");
const { transformarADTO2}=require( "../dto/ProductosDto.js");
const { transformarADTO3}=require( "../dto/UsuariosDto.js");

let getDao = function(opcion){
    switch (opcion) {
        case 'Mensajes':
            dao = transformarADTO;
            break
        case 'Productos':
            dao = transformarADTO2;
            break
        case 'Usuarios':
            dao = transformarADTO3;
            break
    } 
    return dao;
}
module.exports={getDao};