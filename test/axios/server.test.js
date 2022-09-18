const {strictEqual, deepStrictEqual,ok}=require("assert");
const axios= require("axios");

const enviarProducto = data =>axios.post("http://localhost:8080/productos", {data});
const eliminarProducto = data =>axios.delete("http://localhost:8080/productos", {data});
const actualizarProducto = (data,id) =>axios.put("http://localhost:8080/productos", {data,id});
const recibirProductos =() =>  axios("http://localhost:8080/productos");

describe("Comprobando que el servidor funcione", function (){
    before(function(){
        console.log("----------Comienza TOTAL de Test  --------");
    })
    after(function(){
        console.log("----------Final TOTAL de Test  --------");
    })
    beforeEach(function(){
        console.log("----------Comienza Test  --------");
    })
    afterEach(function(){
        console.log("----------Fin Test  --------");
    })

    it("Leer Productos", async function (){
        const {data} = await recibirProductos();
        //valido si la variable tiene datos
        ok(data);
    })
    it("Insertar Productos", async function (){

        let {data} = await recibirProductos();
        let id= data[data.length - 1].id>0?data[data.length - 1].id+1:1;
        let newProducto= {
            id: id,
            nombre: "Carro4",
            precio: 65000000,
            foto: "https://cdn-icons-png.flaticon.com/512/2554/2554969.png"
        };
        await enviarProducto(newProducto);
        let {data:data2} = await recibirProductos();
        let ultimo_producto= data2[data2.length - 1];
        //valido si los datos del producto que ingreso es igual a los datos del ultimo producto que trae la lista de productos
        deepStrictEqual(newProducto, ultimo_producto);
    })
    it("Actualizar Productos", async function (){
        let newProducto= {
            nombre: "Carro5",
            precio: 9000000,
            foto: "https://cdn-icons-png.flaticon.com/512/2554/2554969.png"
        };
        let {data} = await recibirProductos();
        let id_act =data[data.length - 1].id;
        await actualizarProducto(newProducto, id_act);
        let {data:data2} = await recibirProductos();
        let nombre="";
        data2.forEach(element => {
            if (element.id==id_act) {
                nombre=element.nombre;
            }
        });
        //valido si el nombre del producto que ingreso es igual al nombre del producto que se actualizo que trae la lista de productos por id
        deepStrictEqual(newProducto.nombre, nombre);
    })
    it("Eliminar Productos", async function (){
        let {data} = await recibirProductos();
        let id_eli =data[data.length - 1].id;
        await eliminarProducto({data:id_eli});
        let {data:data2} = await recibirProductos();
        let nombre=true;
        data2.forEach(element => {
            if (element.id==id_eli) {
                nombre=false;
            }
        });
        //valido si el id del producto que se elimino existe en la lista de productos por el id
        ok(nombre);
    })
})