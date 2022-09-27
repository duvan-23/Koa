// const RecordatoriosApi = require("../api/RecordatoriosApi.js");

const{graphqlHTTP}= require("express-graphql");
const {buildSchema}= require("graphql");
const services = require( '../negocio/negocio.js');


const schema = buildSchema(`
    type Author{
        id: ID,
        nombre: String,
        apellido: String,
        edad: Int,
        alias: String,
        avatar: String
    }
    type Author2{
        message: String,
        fecha: String
    }

    type Mensaje{
        id: ID!
        author: Author,
        title: Author2
    }
    type Mensaje2{
        id: ID!
        author: Author,
        text: Author2
    }
    type Producto{
        id: ID!
        nombre: String,
        precio: Float,
        foto: String
    }
    type Usuarios{
        username: String,
        password: String,
        direccion: String,
        contador: Int
    }
    input Author3{
        id: ID,
        nombre: String,
        apellido: String,
        edad: Int,
        alias: String,
        avatar: String
    }
    input Author4{
        message: String,
        fecha: String
    }
    input UsuarioGuardar{
        username: String,
        password: String,
        direccion: String,
        contador: Int
    }
    input MensajeGuardar{
        author: Author3,
        text: Author4
    }
    input productoGuardar{
        nombre: String,
        precio: Float,
        foto: String
    }
    type Query{
        getMensajes: [Mensaje],
        getProductos: [Producto],
        buscarUsuario(username:String):Usuarios
    }
    type Mutation{
        actualizarUsuarioCant(username:String,contador:Int):[Usuarios],
        crearUsuario(datos:UsuarioGuardar):[Usuarios],
        crearMensaje(datos:MensajeGuardar):[Mensaje2],
        crearProducto(datos:productoGuardar):[Producto],
        eliminarProducto(id:ID!):[Producto],
        actualizarProducto(datos:productoGuardar,id:ID!):[Producto]
    }
`);

let GraphQLController= class {
    constructor (){
        async function resMensajes(){
            await services.conectarse();
            let a =await services.mostrarMensajes();
            a = JSON.stringify(a);
            a = a.replace("MensajesDTO ","");
            a = JSON.parse(a);
            return a;
        }
        async function resProductos(){
            await services.conectarse();
            let a =await services.mostrarProductos();
            a = JSON.stringify(a);
            a = a.replace("ProductosDTO ","");
            a = JSON.parse(a);
            return a;
        }
        async function resUsuarios(username){
            await services.conectarse();
            let a =await services.getNombre(username);
            a = JSON.stringify(a);
            a = a.replace("UsuariosDTO ","");
            a = JSON.parse(a);
            return a;
        }
        return graphqlHTTP({
            schema: schema,
            rootValue:{
                getMensajes: resMensajes(),
                getProductos: resProductos(), 
                buscarUsuario: ({username}) => {return resUsuarios(username);},
                actualizarUsuarioCant: async ({username,contador}) => {return await services.actualizarUsuarios(username,contador);},
                crearUsuario: async ({datos}) => {return await services.agregarUsuarios(datos);},
                crearMensaje: async ({datos}) => {return await services.grabarMensajes(datos);},
                crearProducto: async ({datos}) => {return await services.grabarProductos(datos);},
                eliminarProducto: async ({id}) => {return await services.borrarProductos(id);},
                actualizarProducto: async ({datos,id}) => {return await services.actualizarProductos(datos,id);}
            },
            graphiql:true
        })
    }
}
module.exports = GraphQLController;