import { Struct } from "./struct.js"



export class Instancia{

    constructor(struct){
        
        /**
         * @type {Struct}
         */

        this.struct = struct
        this.propiedades = {}
    }

    set(nombre, {tipo, valor}){
        console.log(nombre + " en instancia")
        console.log(tipo + " en instancia")
        console.log(valor + " en instancia")
        this.propiedades[nombre] =  { tipo, valor }
    }

    get(nombre){

        if(this.propiedades.hasOwnProperty(nombre)){
            return this.propiedades[nombre].valor
        }

        const metodo = this.struct.buscarMetodo(nombre)
        if (metodo) {
            return metodo.atar(this)
        }
        throw new Error("Propiedad no encontrada: " + nombre)
    }



}