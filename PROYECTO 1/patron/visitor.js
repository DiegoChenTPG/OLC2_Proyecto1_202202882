
/**

 * @typedef {import('./nodos').Expresion} Expresion


 * @typedef {import('./nodos').OperacionBinaria} OperacionBinaria


 * @typedef {import('./nodos').OperacionUnaria} OperacionUnaria


 * @typedef {import('./nodos').Agrupacion} Agrupacion


 * @typedef {import('./nodos').Numero} Numero


 * @typedef {import('./nodos').DeclaracionVariable} DeclaracionVariable


 * @typedef {import('./nodos').AccesoVariable} AccesoVariable


 * @typedef {import('./nodos').Print} Print


 * @typedef {import('./nodos').ExpresionStmt} ExpresionStmt


 * @typedef {import('./nodos').Asignacion} Asignacion


 * @typedef {import('./nodos').Bloque} Bloque


 * @typedef {import('./nodos').If} If


 * @typedef {import('./nodos').While} While


 * @typedef {import('./nodos').For} For


 * @typedef {import('./nodos').Break} Break


 * @typedef {import('./nodos').Continue} Continue


 * @typedef {import('./nodos').Return} Return


 * @typedef {import('./nodos').Llamada} Llamada


 * @typedef {import('./nodos').DeclaracionFuncion} DeclaracionFuncion


 * @typedef {import('./nodos').DeclaracionStruct} DeclaracionStruct


 * @typedef {import('./nodos').Instancia} Instancia


 * @typedef {import('./nodos').Get} Get


 * @typedef {import('./nodos').Set} Set


 * @typedef {import('./nodos').DeclaracionArreglo} DeclaracionArreglo


 * @typedef {import('./nodos').AccesoValorArreglo} AccesoValorArreglo


 * @typedef {import('./nodos').AsignacionValorArreglo} AsignacionValorArreglo


 * @typedef {import('./nodos').DeclaracionArregloReservado} DeclaracionArregloReservado


 * @typedef {import('./nodos').FuncParseInt} FuncParseInt


 * @typedef {import('./nodos').FuncParseFloat} FuncParseFloat


 * @typedef {import('./nodos').FuncToString} FuncToString


 * @typedef {import('./nodos').FuncToLowerCase} FuncToLowerCase


 * @typedef {import('./nodos').FuncToUpperCase} FuncToUpperCase


 * @typedef {import('./nodos').FuncTypeOf} FuncTypeOf


 * @typedef {import('./nodos').FuncIndexOf} FuncIndexOf


 * @typedef {import('./nodos').FuncJoin} FuncJoin


 * @typedef {import('./nodos').FuncLength} FuncLength


 * @typedef {import('./nodos').Switch} Switch

 */


/**
 * Clase base para los visitantes
 * @abstract
 */
export class BaseVisitor {

    
    /**
     * @param {Expresion} node
     * @returns {any}
     */
    visitExpresion(node) {
        throw new Error('Metodo visitExpresion no implementado');
    }
    

    /**
     * @param {OperacionBinaria} node
     * @returns {any}
     */
    visitOperacionBinaria(node) {
        throw new Error('Metodo visitOperacionBinaria no implementado');
    }
    

    /**
     * @param {OperacionUnaria} node
     * @returns {any}
     */
    visitOperacionUnaria(node) {
        throw new Error('Metodo visitOperacionUnaria no implementado');
    }
    

    /**
     * @param {Agrupacion} node
     * @returns {any}
     */
    visitAgrupacion(node) {
        throw new Error('Metodo visitAgrupacion no implementado');
    }
    

    /**
     * @param {Numero} node
     * @returns {any}
     */
    visitNumero(node) {
        throw new Error('Metodo visitNumero no implementado');
    }
    

    /**
     * @param {DeclaracionVariable} node
     * @returns {any}
     */
    visitDeclaracionVariable(node) {
        throw new Error('Metodo visitDeclaracionVariable no implementado');
    }
    

    /**
     * @param {AccesoVariable} node
     * @returns {any}
     */
    visitAccesoVariable(node) {
        throw new Error('Metodo visitAccesoVariable no implementado');
    }
    

    /**
     * @param {Print} node
     * @returns {any}
     */
    visitPrint(node) {
        throw new Error('Metodo visitPrint no implementado');
    }
    

    /**
     * @param {ExpresionStmt} node
     * @returns {any}
     */
    visitExpresionStmt(node) {
        throw new Error('Metodo visitExpresionStmt no implementado');
    }
    

    /**
     * @param {Asignacion} node
     * @returns {any}
     */
    visitAsignacion(node) {
        throw new Error('Metodo visitAsignacion no implementado');
    }
    

    /**
     * @param {Bloque} node
     * @returns {any}
     */
    visitBloque(node) {
        throw new Error('Metodo visitBloque no implementado');
    }
    

    /**
     * @param {If} node
     * @returns {any}
     */
    visitIf(node) {
        throw new Error('Metodo visitIf no implementado');
    }
    

    /**
     * @param {While} node
     * @returns {any}
     */
    visitWhile(node) {
        throw new Error('Metodo visitWhile no implementado');
    }
    

    /**
     * @param {For} node
     * @returns {any}
     */
    visitFor(node) {
        throw new Error('Metodo visitFor no implementado');
    }
    

    /**
     * @param {Break} node
     * @returns {any}
     */
    visitBreak(node) {
        throw new Error('Metodo visitBreak no implementado');
    }
    

    /**
     * @param {Continue} node
     * @returns {any}
     */
    visitContinue(node) {
        throw new Error('Metodo visitContinue no implementado');
    }
    

    /**
     * @param {Return} node
     * @returns {any}
     */
    visitReturn(node) {
        throw new Error('Metodo visitReturn no implementado');
    }
    

    /**
     * @param {Llamada} node
     * @returns {any}
     */
    visitLlamada(node) {
        throw new Error('Metodo visitLlamada no implementado');
    }
    

    /**
     * @param {DeclaracionFuncion} node
     * @returns {any}
     */
    visitDeclaracionFuncion(node) {
        throw new Error('Metodo visitDeclaracionFuncion no implementado');
    }
    

    /**
     * @param {DeclaracionStruct} node
     * @returns {any}
     */
    visitDeclaracionStruct(node) {
        throw new Error('Metodo visitDeclaracionStruct no implementado');
    }
    

    /**
     * @param {Instancia} node
     * @returns {any}
     */
    visitInstancia(node) {
        throw new Error('Metodo visitInstancia no implementado');
    }
    

    /**
     * @param {Get} node
     * @returns {any}
     */
    visitGet(node) {
        throw new Error('Metodo visitGet no implementado');
    }
    

    /**
     * @param {Set} node
     * @returns {any}
     */
    visitSet(node) {
        throw new Error('Metodo visitSet no implementado');
    }
    

    /**
     * @param {DeclaracionArreglo} node
     * @returns {any}
     */
    visitDeclaracionArreglo(node) {
        throw new Error('Metodo visitDeclaracionArreglo no implementado');
    }
    

    /**
     * @param {AccesoValorArreglo} node
     * @returns {any}
     */
    visitAccesoValorArreglo(node) {
        throw new Error('Metodo visitAccesoValorArreglo no implementado');
    }
    

    /**
     * @param {AsignacionValorArreglo} node
     * @returns {any}
     */
    visitAsignacionValorArreglo(node) {
        throw new Error('Metodo visitAsignacionValorArreglo no implementado');
    }
    

    /**
     * @param {DeclaracionArregloReservado} node
     * @returns {any}
     */
    visitDeclaracionArregloReservado(node) {
        throw new Error('Metodo visitDeclaracionArregloReservado no implementado');
    }
    

    /**
     * @param {FuncParseInt} node
     * @returns {any}
     */
    visitFuncParseInt(node) {
        throw new Error('Metodo visitFuncParseInt no implementado');
    }
    

    /**
     * @param {FuncParseFloat} node
     * @returns {any}
     */
    visitFuncParseFloat(node) {
        throw new Error('Metodo visitFuncParseFloat no implementado');
    }
    

    /**
     * @param {FuncToString} node
     * @returns {any}
     */
    visitFuncToString(node) {
        throw new Error('Metodo visitFuncToString no implementado');
    }
    

    /**
     * @param {FuncToLowerCase} node
     * @returns {any}
     */
    visitFuncToLowerCase(node) {
        throw new Error('Metodo visitFuncToLowerCase no implementado');
    }
    

    /**
     * @param {FuncToUpperCase} node
     * @returns {any}
     */
    visitFuncToUpperCase(node) {
        throw new Error('Metodo visitFuncToUpperCase no implementado');
    }
    

    /**
     * @param {FuncTypeOf} node
     * @returns {any}
     */
    visitFuncTypeOf(node) {
        throw new Error('Metodo visitFuncTypeOf no implementado');
    }
    

    /**
     * @param {FuncIndexOf} node
     * @returns {any}
     */
    visitFuncIndexOf(node) {
        throw new Error('Metodo visitFuncIndexOf no implementado');
    }
    

    /**
     * @param {FuncJoin} node
     * @returns {any}
     */
    visitFuncJoin(node) {
        throw new Error('Metodo visitFuncJoin no implementado');
    }
    

    /**
     * @param {FuncLength} node
     * @returns {any}
     */
    visitFuncLength(node) {
        throw new Error('Metodo visitFuncLength no implementado');
    }
    

    /**
     * @param {Switch} node
     * @returns {any}
     */
    visitSwitch(node) {
        throw new Error('Metodo visitSwitch no implementado');
    }
    
}
