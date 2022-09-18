const ContenedorMongoDb = require( '../persistencia/contenedores/ContenedorMongoDb.js');
const ClienteSQL1 = require( '../persistencia/contenedores/sql1.js');
const dotenv = require( 'dotenv/config')
const options1 = require( '../options/mysqlconn.js')
const url = process.env.URL;
let getDaoDbInsert = function(data,opcion){
    switch (opcion) {
        case 'Mensajes':
            dao = new ContenedorMongoDb(url);
            dao= dao.leerTodo(data);
            break
        case 'Productos':
            dao = new ClienteSQL1(options1);
            dao= dao.insertarProductos(data);
            break
    } 
    return dao;
}
let getDaoDbSelect = function(opcion){
    switch (opcion) {
        case 'Mensajes':
            dao = new ContenedorMongoDb(url);
            dao= dao.leerAll(" ");
            break
        case 'Productos':
            dao = new ClienteSQL1(options1);
            dao= dao.listarProductos();
            break
    } 
    return dao;
}
let getDaoDbDelete = function(data,opcion){
    switch (opcion) {
        case 'Productos':
            dao = new ClienteSQL1(options1);
            dao= dao.borrarProducto(data);
            break
    } 
    return dao;
}
let getDaoDbUpdate = function(data,id,opcion){
    switch (opcion) {
        case 'Productos':
            dao = new ClienteSQL1(options1);
            dao= dao.actualizarProducto(data,id);
            break
    } 
    return dao;
}
module.exports={getDaoDbInsert,getDaoDbSelect,getDaoDbDelete,getDaoDbUpdate};