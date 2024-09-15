import { Struct } from "./struct.js"



export class Instancia{

    constructor(struct){
        
        /**
         * @type {Struct}
         */

        this.struct = struct
        this.propiedades = {}
    }

    set(nombre, valor){
        this.propiedades[nombre] = valor
    }

    get(nombre){

        if(this.propiedades.hasOwnProperty(nombre)){
            return this.propiedades[nombre]
        }

        const metodo = this.struct.buscarMetodo(nombre)
        if (metodo) {
            return metodo.atar(this)
        }
        throw new Error("Propiedad no encontrada: " + nombre)
    }
}