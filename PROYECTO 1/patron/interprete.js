import { Entorno } from "../entorno/entorno.js";
import { FuncionForanea } from "./funciones/foranea.js";
import { Invocable } from "./funciones/invocable.js";
import { nativas } from "./funciones/nativas.js";
import nodos from "./nodos.js";
import { BreakException, ContinueException, ReturnException } from "./sentencias_transferencia/transferencia.js";
import { Instancia } from "./structs/instancia.js";
import { Struct } from "./structs/struct.js";
import { BaseVisitor } from "./visitor.js";


export class InterpreterVisitor extends BaseVisitor{


    constructor(){
        super()
        this.entornoActual = new Entorno()

        //funciones nativas
        Object.entries(nativas).forEach(([nombre, funcion]) => {
            this.entornoActual.set(nombre, funcion)
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
        const tipoVariable = node.tipo
        let valorVariable =  null
        
        if (node.exp !== null) {
            valorVariable = node.exp.accept(this) // Asignar valor si hay expresión
        }
        
        //this.entornoActual.set(nombreVariable, valorVariable)
        this.entornoActual.set(nombreVariable, { tipo: tipoVariable, valor: valorVariable })

    }

    /** 
    * @type {BaseVisitor['visitAccesoVariable']}
    */
    visitAccesoVariable(node){

        const nombreVariable = node.id
        const valorVariable = this.entornoActual.get(nombreVariable)
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
        this.entornoActual.asignar(node.id, valorVariableNuevo)
        return valorVariableNuevo
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

    /** 
    * @type {BaseVisitor['visitDeclaracionFuncion']}
    */ 
    visitDeclaracionFuncion(node){
        const funcion = new FuncionForanea(node, this.entornoActual)
        this.entornoActual.set(node.id, funcion)
    }

    /** 
    * @type {BaseVisitor['visitDeclaracionStruct']}
    */
    visitDeclaracionStruct(node){

        const metodos = {}
        const atributos = {}
        node.declaraciones.forEach(dcl => {
            if (dcl instanceof nodos.DeclaracionFuncion) {
                metodos[dcl.id] = new FuncionForanea(dcl, this.entornoActual);
            } else if (dcl instanceof nodos.DeclaracionVariable) {
                //console.log(dcl.tipo + " imprimiendo dcl.tipo")
                //console.log(dcl.exp.valor + " imprimiendo el valor de dcl.exp")
                //console.log(dcl.id + " imprimiendo dcl.id")
                atributos[dcl.id] = dcl.exp
                
                atributos[dcl.id] = {
                    tipo: dcl.tipo,
                    valor: dcl.exp
                }
            }
        })


        const struct = new Struct(node.id, atributos, metodos)
        //this.entornoActual.set(node.id, struct) //COMENTADO 15/09 CORRIGIENDO STRUCT Y TIPADO
        this.entornoActual.set(node.id, { tipo: "struct", valor: struct })
    }

    

    /** 
    * @type {BaseVisitor['visitInstancia']}
    */
    visitInstancia(node){

        /*
        const struct = this.entornoActual.get(node.id)

        const argumentos = node.args.map(arg => arg.accept(this));

        if(!(struct instanceof Struct)){
            throw new Error("No es posible instanciar algo que no es una clase")
        }


        return struct.invocar(this, argumentos)

        COMENTADO EL 15/09
        */

        
        const resultado = this.entornoActual.get(node.id);

        // Asegúrate de que sea un Struct.
        //console.log("ESTAMOS IMPRIMIENDO RESULTADO.TIPO:" + resultado.tipo)
        if (resultado === undefined || resultado.tipo !== "struct") {
            throw new Error("No es posible instanciar algo que no es una clase")
        }
        //const struct = this.entornoActual.get(node.id); 
        const struct = resultado.valor;  // Ahora estamos seguros de que es un Struct
        const argumentos = node.args.map(arg => arg.accept(this))
        return struct.invocar(this, argumentos)
        
    }

    /** 
    * @type {BaseVisitor['visitGet']}
    */

    visitGet(node){
        const instancia = node.objetivo.accept(this)

        if(!(instancia instanceof Instancia)) {
            throw new Error("No es posible obtener una propiedad de algo que no es una instancia")
        }

        return instancia.get(node.propiedad)
    }
    
    /** 
    * @type {BaseVisitor['visitSet']}
    */
    visitSet(node){
        const instancia =  node.objetivo.accept(this)

        if(!(instancia instanceof Instancia)){
            throw new Error("No es posible asignar una propiedad de algo que no es una instancia")
        }
        const valor = node.valor.accept(this)
        console.log("estamos imprimiendo valor en set del interprete "+ valor.tipo)
        //instancia.set(node.propiedad, valor)
        instancia.set(node.propiedad, {tipo: valor.tipo, valor: valor})

        return valor
    }
}