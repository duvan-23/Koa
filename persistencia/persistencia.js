const ContenedorMongoDb = require( './contenedores/ContenedorMongoDb.js');
const ClienteSQL1 = require( './contenedores/sql1.js');
const dotenv = require( 'dotenv/config')
const options1 = require( '../options/mysqlconn.js')
const {getDao} = require('../factory/factory.js')
const {getDaoDbInsert,getDaoDbSelect,getDaoDbDelete,getDaoDbUpdate} = require('../factory/factoryDb.js')

const url = process.env.URL;
const contenedorMongo = new ContenedorMongoDb(url);
const sql1 = new ClienteSQL1(options1);
async function conectar(){
    contenedorMongo.conectar();
}
async function getById(id){
    let nombre =this.nombre;
    let dto= getDao('Usuarios');
    return dto(await contenedorMongo.leerId(id, nombre));
}
async function getByNombre(name){
    let nombre =this.nombre;
    let dto= getDao('Usuarios');
    return dto(await contenedorMongo.leerNombre(name, nombre));
}
// async function listarMensajes(){
//     let nombre =this.nombre;
//     let dto= getDao('Mensajes');
//     return dto(await contenedorMongo.leerAll(nombre));
// }

// async function insertarMensajes(data){
//     let nombre =this.nombre;
//     return await contenedorMongo.leerTodo(data);
// }

async function deleteById(id){
    let nombre =this.nombre;
    return await contenedorMongo.eliminarId(id,nombre);
}

async function putId(id,datos){
    let nombre =this.nombre;
    return await contenedorMongo.actualizar(id,nombre,datos);
}
async function putUsuarios(name,datos){
    let nombre =this.nombre;
    return await contenedorMongo.actualizarUsuarios(name,nombre,datos);
}
async function insertarUsuarios(data){
    let nombre =this.nombre;
    return await contenedorMongo.guardarUsuarios(nombre,data);
    // return await leerTodo(nombre,data);
}
// async function insertarProductos(data){
//      await sql1.insertarProductos(data);
// }
// async function listarProductos(){
//     let dto= getDao('Productos');
//      return dto(await sql1.listarProductos());
// }
async function insertar(data,tabla){
    let dto= getDaoDbInsert(data,tabla);
    return await dto;
}
async function listar(tabla){
    let dto1= getDao(tabla);
    let dto= getDaoDbSelect(tabla);
    return dto1(await dto);
}
async function Eliminar(data,tabla){
    let dto= getDaoDbDelete(data,tabla);
    await dto;
}
async function Actualizar(data,id,tabla){
    let dto= getDaoDbUpdate(data,id,tabla);
    await dto;
}


module.exports={conectar,getById,getByNombre,deleteById,putId,putUsuarios,insertarUsuarios,insertar,listar,Eliminar,Actualizar}