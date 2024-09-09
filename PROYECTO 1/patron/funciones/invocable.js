import { InterpreterVisitor } from "../interprete.js"
import { Entorno } from "../../entorno/entorno.js"

export class Invocable{

    aridad(){
        throw new Error("no implementado")
    }


    /**
     * @param interprete {InterpreterVisitor}
     * @param args {any[]}
     */
    invocar(interprete, args){
        throw new Error("No implementado")
    }


}