import { Entorno } from "../entorno/entorno.js";
import { Invocable } from "./funciones/invocable.js";
import { nativas } from "./funciones/nativas.js";
import { BreakException, ContinueException, ReturnException } from "./sentencias_transferencia/transferencia.js";
import { BaseVisitor } from "./visitor.js";


export class InterpreterVisitor extends BaseVisitor{


    constructor(){
        super()
        this.entornoActual = new Entorno()

        //funciones nativas
        Object.entries(nativas).forEach(([nombre, funcion]) => {
            this.entornoActual.setVariable(nombre, funcion)
        })

        this.salida = ""
    }

    //ESTOS COSOS DE AQUI ES PARA QUE LOS node DE LOS visit NO PIERDAN EL TIPADO
    /**
    * @type {BaseVisitor['visitOperacionBinaria']}
    */

    visitOperacionBinaria(node){
        const izq = node.izq.accept(this)
        const der = node.der.accept(this)

        switch(node.op){

            case "+":
                return izq + der
            case "-":
                return izq - der
            case "*":
                return izq * der
            case "/":
                return izq / der
            case "%":
                return izq % der
            case "<=":
                return izq <= der
            case "<":
                return izq < der
            case ">":
                return izq > der
            case ">=":
                return izq >= der
            case "==":
                return izq == der
            case "!=":
                return izq != der
            case "&&":
                return izq && der
            case "||":
                return izq || der
            default:
                throw new Error("OPERADOR NO SOPORTADO:"+node.op)

        }
    }

    /**
    * @type {BaseVisitor['visitOperacionUnaria']}
    */

    visitOperacionUnaria(node){
        const exp = node.exp.accept(this)

        switch(node.op){
            case "-":
                return -exp
            case "!":
                return !exp
            default:
                throw new Error("OPERADOR NO SOPORTADO:"+node.op)

        }
    }


    /**
    * @type {BaseVisitor['visitNumero']}
    */

    visitNumero(node){
        return node.valor
    }

    /** 
    * @type {BaseVisitor['visitAgrupacion']}
    */

    visitAgrupacion(node){
        return node.exp.accept(this)
    }

    /** 
    * @type {BaseVisitor['visitDeclaracionVariable']}
    */

    visitDeclaracionVariable(node){
        const nombreVariable = node.id
        const valorVariable = node.exp.accept(this)


        this.entornoActual.setVariable(nombreVariable, valorVariable)

    }

    /** 
    * @type {BaseVisitor['visitAccesoVariable']}
    */
    visitAccesoVariable(node){

        const nombreVariable = node.id
        const valorVariable = this.entornoActual.getVariable(nombreVariable)
        return valorVariable

    }

    /** 
    * @type {BaseVisitor['visitPrint']}
    */  
    visitPrint(node){
        const valor = node.exp.accept(this)
        this.salida += valor + "\n"

    }

    /** 
    * @type {BaseVisitor['visitExpresionStmt']}
    */  

    visitExpresionStmt(node) {
        node.exp.accept(this);
    }

    /** 
    * @type {BaseVisitor['visitAsignacion']}
    */  

    visitAsignacion(node) {
        const valorVariableNuevo = node.asignacion.accept(this)
        this.entornoActual.asignarVariable(node.id, valorVariableNuevo)
        //return valorVariableNuevo
    }


    /** 
    * @type {BaseVisitor['visitBloque']}
    */  
    visitBloque(node){
        const entorno_anterior = this.entornoActual
        this.entornoActual = new Entorno(entorno_anterior)

        node.dcls.forEach(dcl => dcl.accept(this))
        this.entornoActual = entorno_anterior

    }

    /** 
    * @type {BaseVisitor['visitIf']}
    */ 
    visitIf(node){
        const condicion = node.condicion.accept(this)

        if(condicion){
            node.sentenciasTrue.accept(this)
            return
        }

        if(node.sentenciasFalse){
            node.sentenciasFalse.accept(this)
        }


    }
    /** 
    * @type {BaseVisitor['visitWhile']}
    */ 
    visitWhile(node){   
        const entornoAnterior = this.entornoActual
        try {
            while(node.condicion.accept(this)){
                node.sentencias.accept(this)
            }
        } catch (error) {
            this.entornoActual = entornoAnterior

            if(error instanceof BreakException){
                console.log("break")
                return
            }

            if(error instanceof ContinueException){
                console.log("break")
                return this.visitWhile(node)
            }

            throw error
        }

    }
    /** 
    * @type {BaseVisitor['visitFor']}
    */ 
    visitFor(node){
        const entornoAnterior = this.entornoActual

        try{

            if (node.inicializacion) {
                node.inicializacion.accept(this); // Puede ser una declaracion de variable o una asignacion
            }
        
            /*
            while (node.condicion.accept(this)) {
                node.sentencias.accept(this);
        
                if (node.actualizacion) {
                    node.actualizacion.accept(this);
                }
            }
            */
    
            // el for puede ir asi, ya que defina la variable o asignacion arriba, js puede ejecutar el for de esta forma
            for(; node.condicion.accept(this) ; node.actualizacion.accept(this)){
                try{

                    node.sentencias.accept(this)

                }catch (error){

                    if(error instanceof ContinueException){
                        continue
                    }
                    throw error
                }
            }

        }catch(error){
            this.entornoActual = entornoAnterior

            if(error instanceof BreakException){
                console.log("break")
                return
            }

            throw error
        }


    }

    /** 
    * @type {BaseVisitor['visitBreak']}
    */ 
    visitBreak(node){
        throw new BreakException()
    }

    /** 
    * @type {BaseVisitor['visitContinue']}
    */ 
    visitContinue(node){
        throw new ContinueException()
    }
    
    /** 
    * @type {BaseVisitor['visitReturn']}
    */ 
    visitReturn(node){
        let valor = null
        if(node.exp){
            valor = node.exp.accept(this)    
        }
        throw new ReturnException(valor)
    }
    /** 
    * @type {BaseVisitor['visitLlamada']}
    */ 
    visitLlamada(node){
        const funcion = node.callee.accept(this)

        const argumentos = node.args.map(arg => arg.accept(this))

        if(!(funcion instanceof Invocable)){
            throw new Error("No es invocable")
        }

        if(funcion.aridad() !== argumentos.length){
            throw new Error("Aridad incorrecta")
        }

        return funcion.invocar(this, argumentos)
    }
}