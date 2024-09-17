import { Entorno } from "../../entorno/entorno.js";
import { DeclaracionFuncion } from "../nodos.js";
import { ReturnException } from "../sentencias_transferencia/transferencia.js";
import { Invocable } from "./invocable.js";

export class FuncionForanea extends Invocable{
    constructor(nodo, clousure){
        super()    


        /**
         * @type {DeclaracionFuncion}
         */
        this.nodo = nodo    


        /**
         * @type {Entorno}
         */
        this.clousure = clousure
    }


    aridad(){
        return this.nodo.parametros.length
    }
    


    /**
     * 
     * @type {Invocable['invocar']} 
     */
    invocar(interprete, args){
        const entornoNuevo = new Entorno(this.clousure)
        
        this.nodo.parametros.forEach((parametro, i) => {
            console.log(args[i] + " se supone invocar")
            entornoNuevo.set(parametro, {tipo: "var", valor: args[i]})
        })

        const entornoAntesDeLaLlamada = interprete.entornoActual
        interprete.entornoActual = entornoNuevo

        try {
            this.nodo.bloque.accept(interprete)
        } catch (error) {
            interprete.entornoActual = entornoAntesDeLaLlamada
            
            if(error instanceof ReturnException){
                console.log(error.valor + "REVISANDO EL RETURN")
                return error.valor
                
            }

            //MANEJAR EL RESTO DE SENTENCIAS DE CONTROL
            throw error
        }

        interprete.entornoActual = entornoAntesDeLaLlamada
        return null


    }


    atar(instancia) {
        const entornoOculto = new Entorno(this.clousure);
        entornoOculto.set('this', instancia);
        return new FuncionForanea(this.nodo, entornoOculto);
    }
}

