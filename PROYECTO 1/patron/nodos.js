
/**
 * @typedef {Object} Location
 * @property {Object} start
 * @property {number} start.offset
 * @property {number} start.line
 * @property {number} start.column
 * @property {Object} end
 * @property {number} end.offset
 * @property {number} end.line
 * @property {number} end.column
*/
    

/**
 * @typedef {import('./visitor').BaseVisitor} BaseVisitor
 */

export class Expresion  {

    /**
    * @param {Object} options
    * @param {Location|null} options.location Ubicacion del nodo en el codigo fuente
    */
    constructor() {
        
        
        /**
         * Ubicacion del nodo en el codigo fuente
         * @type {Location|null}
        */
        this.location = null;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitExpresion(this);
    }
}
    
export class OperacionBinaria extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.izq Expresion izquierda de la operacion
 * @param {Expresion} options.der Expresion derecha de la operacion
 * @param {string} options.op Operador de la operacion
    */
    constructor({ izq, der, op }) {
        super();
        
        /**
         * Expresion izquierda de la operacion
         * @type {Expresion}
        */
        this.izq = izq;


        /**
         * Expresion derecha de la operacion
         * @type {Expresion}
        */
        this.der = der;


        /**
         * Operador de la operacion
         * @type {string}
        */
        this.op = op;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitOperacionBinaria(this);
    }
}
    
export class OperacionUnaria extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion de la operacion
 * @param {string} options.op Operador de la operacion
    */
    constructor({ exp, op }) {
        super();
        
        /**
         * Expresion de la operacion
         * @type {Expresion}
        */
        this.exp = exp;


        /**
         * Operador de la operacion
         * @type {string}
        */
        this.op = op;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitOperacionUnaria(this);
    }
}
    
export class Agrupacion extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion agrupada
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion agrupada
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAgrupacion(this);
    }
}
    
export class Numero extends Expresion {

    /**
    * @param {Object} options
    * @param {number} options.valor Valor del numero
    */
    constructor({ valor }) {
        super();
        
        /**
         * Valor del numero
         * @type {number}
        */
        this.valor = valor;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitNumero(this);
    }
}
    
export class DeclaracionVariable extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
 * @param {Expresion | null} options.exp Expresion de la variable, null si no esta inicializada
 * @param {string} options.tipo  Tipo de variable (int, float, string, boolean, char)
    */
    constructor({ id, exp, tipo }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;


        /**
         * Expresion de la variable, null si no esta inicializada
         * @type {Expresion | null}
        */
        this.exp = exp;


        /**
         *  Tipo de variable (int, float, string, boolean, char)
         * @type {string}
        */
        this.tipo = tipo;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionVariable(this);
    }
}
    
export class AccesoVariable extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
    */
    constructor({ id }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAccesoVariable(this);
    }
}
    
export class Print extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion[]} options.exp Expresion a imprimir
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a imprimir
         * @type {Expresion[]}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitPrint(this);
    }
}
    
export class ExpresionStmt extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a evaluar
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a evaluar
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitExpresionStmt(this);
    }
}
    
export class Asignacion extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
 * @param {Expresion} options.asignacion Expresion a asignar
    */
    constructor({ id, asignacion }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;


        /**
         * Expresion a asignar
         * @type {Expresion}
        */
        this.asignacion = asignacion;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAsignacion(this);
    }
}
    
export class Bloque extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion[]} options.dcls Sentencias del bloque
    */
    constructor({ dcls }) {
        super();
        
        /**
         * Sentencias del bloque
         * @type {Expresion[]}
        */
        this.dcls = dcls;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBloque(this);
    }
}
    
export class If extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.condicion Condicion del if
 * @param {Expresion} options.sentenciasTrue sentencias que trae el if
 * @param {Expresion|undefined} options.sentenciasFalse sentencias que trae el else
    */
    constructor({ condicion, sentenciasTrue, sentenciasFalse }) {
        super();
        
        /**
         * Condicion del if
         * @type {Expresion}
        */
        this.condicion = condicion;


        /**
         * sentencias que trae el if
         * @type {Expresion}
        */
        this.sentenciasTrue = sentenciasTrue;


        /**
         * sentencias que trae el else
         * @type {Expresion|undefined}
        */
        this.sentenciasFalse = sentenciasFalse;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitIf(this);
    }
}
    
export class While extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.condicion Condicion del while
 * @param {Expresion} options.sentencias sentencias que trae el while
    */
    constructor({ condicion, sentencias }) {
        super();
        
        /**
         * Condicion del while
         * @type {Expresion}
        */
        this.condicion = condicion;


        /**
         * sentencias que trae el while
         * @type {Expresion}
        */
        this.sentencias = sentencias;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitWhile(this);
    }
}
    
export class For extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion|DeclaracionVariable} options.inicializacion 
 * @param {Expresion} options.condicion Condicion del for
 * @param {Expresion} options.actualizacion actualizacion del for
 * @param {Expresion} options.sentencias Sentencias que trae el for
    */
    constructor({ inicializacion, condicion, actualizacion, sentencias }) {
        super();
        
        /**
         * 
         * @type {Expresion|DeclaracionVariable}
        */
        this.inicializacion = inicializacion;


        /**
         * Condicion del for
         * @type {Expresion}
        */
        this.condicion = condicion;


        /**
         * actualizacion del for
         * @type {Expresion}
        */
        this.actualizacion = actualizacion;


        /**
         * Sentencias que trae el for
         * @type {Expresion}
        */
        this.sentencias = sentencias;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitFor(this);
    }
}
    
export class Break extends Expresion {

    /**
    * @param {Object} options
    * 
    */
    constructor() {
        super();
        
    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBreak(this);
    }
}
    
export class Continue extends Expresion {

    /**
    * @param {Object} options
    * 
    */
    constructor() {
        super();
        
    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitContinue(this);
    }
}
    
export class Return extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion|undefined} options.exp Expresion a retornar
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a retornar
         * @type {Expresion|undefined}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitReturn(this);
    }
}
    
export class Llamada extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.callee Expresion a llamar
 * @param {Expresion[]} options.args Argumentos de la llamada
    */
    constructor({ callee, args }) {
        super();
        
        /**
         * Expresion a llamar
         * @type {Expresion}
        */
        this.callee = callee;


        /**
         * Argumentos de la llamada
         * @type {Expresion[]}
        */
        this.args = args;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitLlamada(this);
    }
}
    
export class DeclaracionFuncion extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id identificador de la funcion
 * @param {string[]} options.parametros Parametros de la funcion
 * @param {Bloque} options.bloque Cuerpo de la funcion
    */
    constructor({ id, parametros, bloque }) {
        super();
        
        /**
         * identificador de la funcion
         * @type {string}
        */
        this.id = id;


        /**
         * Parametros de la funcion
         * @type {string[]}
        */
        this.parametros = parametros;


        /**
         * Cuerpo de la funcion
         * @type {Bloque}
        */
        this.bloque = bloque;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionFuncion(this);
    }
}
    
export class DeclaracionStruct extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador del struct
 * @param {Expresion[]} options.declaraciones Declaraciones del struct
    */
    constructor({ id, declaraciones }) {
        super();
        
        /**
         * Identificador del struct
         * @type {string}
        */
        this.id = id;


        /**
         * Declaraciones del struct
         * @type {Expresion[]}
        */
        this.declaraciones = declaraciones;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionStruct(this);
    }
}
    
export class Instancia  {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la clase
 * @param {Expresion[]} options.args Argumentos de la instancia
    */
    constructor({ id, args }) {
        
        
        /**
         * Identificador de la clase
         * @type {string}
        */
        this.id = id;


        /**
         * Argumentos de la instancia
         * @type {Expresion[]}
        */
        this.args = args;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitInstancia(this);
    }
}
    
export class Get  {

    /**
    * @param {Object} options
    * @param {Expresion} options.objetivo Objeto de la propiedad
 * @param {string} options.propiedad Identificador de la propiedad
    */
    constructor({ objetivo, propiedad }) {
        
        
        /**
         * Objeto de la propiedad
         * @type {Expresion}
        */
        this.objetivo = objetivo;


        /**
         * Identificador de la propiedad
         * @type {string}
        */
        this.propiedad = propiedad;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitGet(this);
    }
}
    
export class Set extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.objetivo Objeto de la propiedad
 * @param {string} options.propiedad Identificador de la propiedad
 * @param {Expresion} options.valor Valor de la propiedad
    */
    constructor({ objetivo, propiedad, valor }) {
        super();
        
        /**
         * Objeto de la propiedad
         * @type {Expresion}
        */
        this.objetivo = objetivo;


        /**
         * Identificador de la propiedad
         * @type {string}
        */
        this.propiedad = propiedad;


        /**
         * Valor de la propiedad
         * @type {Expresion}
        */
        this.valor = valor;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitSet(this);
    }
}
    
export class DeclaracionArreglo extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo del arreglo
 * @param {string} options.id Identificador del arreglo
 * @param {Expresion[]} options.valores Valores del arreglo
    */
    constructor({ tipo, id, valores }) {
        super();
        
        /**
         * Tipo del arreglo
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Identificador del arreglo
         * @type {string}
        */
        this.id = id;


        /**
         * Valores del arreglo
         * @type {Expresion[]}
        */
        this.valores = valores;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionArreglo(this);
    }
}
    
export class AccesoValorArreglo extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id id del arreglo al que accederemos
 * @param {Expresion} options.posicion Posicion del valor en el arreglo
    */
    constructor({ id, posicion }) {
        super();
        
        /**
         * id del arreglo al que accederemos
         * @type {string}
        */
        this.id = id;


        /**
         * Posicion del valor en el arreglo
         * @type {Expresion}
        */
        this.posicion = posicion;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAccesoValorArreglo(this);
    }
}
    
export class AsignacionValorArreglo extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id id del arreglo al que accederemos
 * @param {Expresion} options.posicion Posicion del valor en el arreglo
 * @param {Expresion} options.asignacion Expresion a asignar en la posicion del arreglo
    */
    constructor({ id, posicion, asignacion }) {
        super();
        
        /**
         * id del arreglo al que accederemos
         * @type {string}
        */
        this.id = id;


        /**
         * Posicion del valor en el arreglo
         * @type {Expresion}
        */
        this.posicion = posicion;


        /**
         * Expresion a asignar en la posicion del arreglo
         * @type {Expresion}
        */
        this.asignacion = asignacion;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAsignacionValorArreglo(this);
    }
}
    
export class DeclaracionArregloReservado extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo del arreglo
 * @param {string} options.id Identificador del arreglo
 * @param {Expresion} options.cantidad cantidad de valores reservados para el arreglo
    */
    constructor({ tipo, id, cantidad }) {
        super();
        
        /**
         * Tipo del arreglo
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Identificador del arreglo
         * @type {string}
        */
        this.id = id;


        /**
         * cantidad de valores reservados para el arreglo
         * @type {Expresion}
        */
        this.cantidad = cantidad;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionArregloReservado(this);
    }
}
    
export class FuncParseInt extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a parsear
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a parsear
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitFuncParseInt(this);
    }
}
    
export class FuncParseFloat extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a parsear
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a parsear
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitFuncParseFloat(this);
    }
}
    
export class FuncToString extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a parsear
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a parsear
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitFuncToString(this);
    }
}
    
export class FuncToLowerCase extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a trabajar
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a trabajar
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitFuncToLowerCase(this);
    }
}
    
export class FuncToUpperCase extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a trabajar
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a trabajar
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitFuncToUpperCase(this);
    }
}
    
export class FuncTypeOf extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a trabajar
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a trabajar
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitFuncTypeOf(this);
    }
}
    
export class FuncIndexOf extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id identificador del arreglo
 * @param {Expresion} options.exp Valor para obtener el indice
    */
    constructor({ id, exp }) {
        super();
        
        /**
         * identificador del arreglo
         * @type {string}
        */
        this.id = id;


        /**
         * Valor para obtener el indice
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitFuncIndexOf(this);
    }
}
    
export class FuncJoin extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id identificador del arreglo
    */
    constructor({ id }) {
        super();
        
        /**
         * identificador del arreglo
         * @type {string}
        */
        this.id = id;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitFuncJoin(this);
    }
}
    
export class FuncLength extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id identificador del arreglo
    */
    constructor({ id }) {
        super();
        
        /**
         * identificador del arreglo
         * @type {string}
        */
        this.id = id;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitFuncLength(this);
    }
}
    
export default { Expresion, OperacionBinaria, OperacionUnaria, Agrupacion, Numero, DeclaracionVariable, AccesoVariable, Print, ExpresionStmt, Asignacion, Bloque, If, While, For, Break, Continue, Return, Llamada, DeclaracionFuncion, DeclaracionStruct, Instancia, Get, Set, DeclaracionArreglo, AccesoValorArreglo, AsignacionValorArreglo, DeclaracionArregloReservado, FuncParseInt, FuncParseFloat, FuncToString, FuncToLowerCase, FuncToUpperCase, FuncTypeOf, FuncIndexOf, FuncJoin, FuncLength }
