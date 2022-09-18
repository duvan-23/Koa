const {conectar} = require( '../persistencia/persistencia.js');
let PrimeraConexion = class{
    static instancia

    constructor() {
        if (!PrimeraConexion.instancia) {
            (async () => {
                await conectar();
              })();
            this.hora = "Se conecto a Mongo a las: "+new Date().toLocaleString();
            PrimeraConexion.instancia = this;
        } else {
            return PrimeraConexion.instancia;
        }
    }

    obtenerHora() {
        return this.hora;
    }
}
module.exports =PrimeraConexion;