import { FuncionForanea } from "../funciones/foranea.js";
import { Invocable } from "../funciones/invocable.js";
import { Expresion } from "../nodos.js";
import { Instancia } from "./instancia.js";

export class Struct extends Invocable{

    constructor(nombre, atributos, metodos){
        super()


        /**
         * @type {string}
         */
        this.nombre = nombre

        /**
         * @type {Object.<string, Expresion>}
         */
        this.atributos = atributos

        /**
         * @type {Object.<string, FuncionForanea>}
         */
        this.metodos = metodos
    }


    /**
     * @param {string} nombre
     * @returns {FuncionForanea | null}
     */
    buscarMetodo(nombre){
        if(this.metodos.hasOwnProperty(nombre)){
            return this.metodos[nombre]
        }
        return null
    }

    aridad(){
        const constructor = this.buscarMetodo('constructor')

        if(constructor){
            return constructor.aridad()
        }

        return 0
    }

    /**
     * @type {Invocable['invocar']}
     */

    invocar(interprete, args){
        const nuevaInstancia = new Instancia(this)


        Object.entries(this.atributos).forEach(([nombre, valor]) => {
            nuevaInstancia.set(nombre, valor.accept(interprete))
        })

        const constructor = this.buscarMetodo('constructor')
        if(constructor){
            constructor.atar(nuevaInstancia).invocar(interprete, args)
        }


        return nuevaInstancia
    }
}