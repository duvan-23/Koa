
const request =  require("supertest")("http://localhost:8080");
const expect= require("chai").expect;

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
    describe('GET',()=>{
        it("Leer Productos", async function (){
            const {_body:data} = await request.get("/productos");
            //valido si la variable es un array 
            expect(data).to.be.a('array');
        })
    })
    describe('POST',()=>{
        it("Insertar Productos", async function (){

            const {_body:data} = await request.get("/productos");
            let id= data[data.length - 1].id>0?data[data.length - 1].id+1:1;
            let newProducto= {
                id: id,
                nombre: "Carro4",
                precio: 65000000,
                foto: "https://cdn-icons-png.flaticon.com/512/2554/2554969.png"
            };
            await request.post("/productos").send({data:newProducto});
            const {_body:data2} = await request.get("/productos");
            let ultimo_producto= data2[data2.length - 1];
            //valido si los datos del producto que ingreso es igual a los datos del ultimo producto que trae la lista de productos
            expect(newProducto).to.eql(ultimo_producto);
        })
    })
    describe('PUT',()=>{
        it("Actualizar Productos", async function (){
            let newProducto= {
                nombre: "Carro5",
                precio: 9000000,
                foto: "https://cdn-icons-png.flaticon.com/512/2554/2554969.png"
            };
            const {_body:data} = await request.get("/productos");
            let id_act =data[data.length - 1].id;
            await request.put("/productos").send({data:newProducto, id:id_act});
            const {_body:data2} = await request.get("/productos");
            let nombre="";
            data2.forEach(element => {
                if (element.id==id_act) {
                    nombre=element.nombre;
                }
            });
            //valido si el nombre del producto que ingreso es igual al nombre del producto que se actualizo que trae la lista de productos por id
            expect(newProducto.nombre).to.eql(nombre);
        })
    })
    describe('DELETE',()=>{
        it("Eliminar Productos", async function (){
            const {_body:data} = await request.get("/productos");
            let id_eli =data[data.length - 1].id;
            await request.delete("/productos").send({data:id_eli});
            const {_body:data2} = await request.get("/productos");
            let nombre='true';
            data2.forEach(element => {
                if (element.id==id_eli) {
                    nombre='false';
                }
            });
            //valido si el id del producto que se elimino existe en la lista de productos por el id
            expect(nombre).to.eql("true");
        })
    })
})