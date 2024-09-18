import { Invocable } from "../patron/funciones/invocable.js"
import { Instancia } from "../patron/nodos.js"
import { Struct } from "../patron/structs/struct.js"

export class Entorno {
    /**
     * 
     * @param {Entorno} padre 
     */
    constructor(padre = undefined) {
        this.valores = {}       // HashMap
        this.padre = padre
    }

    /* 
    En este caso se cambio a nombres simples como set, get y asignar porque ya no se guardan solo variables
    si no tambien funciones, clases y luego arreglos 
    */

    /**
     * @param {string} nombre
     * @param {any} valor
     * @param {string} tipo
     */
    set(nombre, { tipo, valor }) {

        //console.log(tipo + "en set de entorno")
        if (valor !== null ) {

            if (!this.validacionTipo(tipo, valor, nombre)) {
                this.valores[nombre] = { tipo, valor:null }
                return
                //throw new Error("Error de tipo: Se esperaba un valor de tipo " + tipo + " para la variable " + nombre);
            }

        }
        
        if (tipo == "var"){
            return
        }
        

        this.valores[nombre] = { tipo, valor }
        
    }


    get(nombre) {
        //console.log(nombre + " si pasa aca")
        const valorActual = this.valores[nombre]
        console.log(valorActual)


        // REASIGNAMOS DE POSICION LOS IFS, PARA QUE PRIMERA VERIFIQUE SI valorActual es undefined, si no ya hacemos todo lo demas
        if (valorActual === undefined && this.padre) { // y lo mismo aca con el ===, ya que si hacemos == undefined, el 0 tambien se considera undefined asi que ===

            // si no existe en el bloque va a buscar a su padre(el entorno superior por decirlo) y lo devuelve
            return this.padre.get(nombre)
        }

        if(valorActual.tipo === "struct") return valorActual

        if (valorActual !== undefined) return valorActual.valor // SI EL VALOR ACTUAL EXISTE LO MANDAMOS
        // SE USA EL !== undefined, ya que el 0 se considera un false aca y no entraria a la condicion en caso de que una variable tenga 0 como valor

        throw new Error("Variable o arreglo" + nombre + " no definida")

    }


    asignar(nombre, valor) {

        const valorActual = this.valores[nombre]

        if (valorActual !== undefined) {

            //console.log(valorActual.tipo + " en asignar")
            if (!this.validacionTipo(valorActual.tipo, valor)) {
                this.valores[nombre] = { tipo: valorActual.tipo, valor:null }
                return
                //throw new Error("Error de tipo: Se esperaba un valor de tipo " + valorActual.tipo + " para la variable " + nombre);
            }
            

            //this.valores[nombre] = valor
            this.valores[nombre] = {tipo: valorActual.tipo, valor}
            return
        }

        if (valorActual === undefined && this.padre) {
            this.padre.asignar(nombre, valor)
            return
        }


        throw new Error("Variable " + nombre + " no definida")

    }


    getValorArreglo(nombre, posicion){
        const valorActual = this.valores[nombre]
        console.log(valorActual)
        

        // REASIGNAMOS DE POSICION LOS IFS, PARA QUE PRIMERA VERIFIQUE SI valorActual es undefined, si no ya hacemos todo lo demas
        if (valorActual === undefined && this.padre) { // y lo mismo aca con el ===, ya que si hacemos == undefined, el 0 tambien se considera undefined asi que ===

            // si no existe en el bloque va a buscar a su padre(el entorno superior por decirlo) y lo devuelve
            //return this.padre.get(nombre) //POSIBLE CAMBIO se comento el 17/09 para agregar lo de abajo
            return this.padre.getValorArreglo(nombre, posicion);
        }

        if (valorActual !== undefined) {
            console.log(valorActual.valor.length)
            console.log(posicion)

            if(posicion < 0 || posicion >= valorActual.valor.length){
                throw new Error("Indice fuera de los limites del arreglo");
                
            }
            return valorActual.valor[posicion]
        }
        // SE USA EL !== undefined, ya que el 0 se considera un false aca y no entraria a la condicion en caso de que una variable tenga 0 como valor

        throw new Error("Arreglo " + nombre + " no definido")
    }


    asignarValorArreglo(nombre, posicion, valor){
        const valorActual = this.valores[nombre]

        if (valorActual !== undefined) {

            //console.log(valorActual.tipo + " en asignar")
            if (!this.validacionTipo(valorActual.tipo, valor)) {
                //this.valores[nombre] = { tipo: valorActual.tipo, valor:null }
                //return
                throw new Error("Error de tipo: Se esperaba un valor de tipo " + valorActual.tipo + " para el arreglo " + nombre);
            }
            
            if(posicion < 0 || posicion >= valorActual.valor.length){
                throw new Error("Indice fuera de los limites del arreglo");
            }

            valorActual.valor[posicion] = valor
            this.valores[nombre] = {tipo: valorActual.tipo, valor: valorActual.valor}
            return
        }

        if (valorActual === undefined && this.padre) {
            //this.padre.asignar(nombre, valor) 17/09
            this.padre.asignarValorArreglo(nombre, posicion, valor);
            return
        }


        throw new Error("Arreglo " + nombre + " no definido")
    }



    /**
     * @param {string} tipo 
     * @param {any} valor 
     * @returns {boolean} 
     */
    validacionTipo(tipo, valor, nombre) {
        //console.log(tipo + " en validacion tipo")
        if(tipo ===  undefined){

            return true
        }
        
        if (tipo == "var") {
            tipo = this.inferirTipo(valor)
            this.valores[nombre] = { tipo, valor }
            return true
        }


        // Verificamos si el tipo es un arreglo
        const esArreglo = tipo.endsWith("[]");
        if (esArreglo) {
            const tipoBase = tipo.slice(0, -2); // Eliminamos los corchetes "[]"
            
            if (Array.isArray(valor)) {
                // Verificamos que cada valor dentro del arreglo sea del tipo correcto
                for (let val of valor) {
                    if (!this.validacionTipo(tipoBase, val, nombre)) {
                        return false;
                    }
                }
                return true;
            } else {
                // Si no es un arreglo, puede ser un valor individual extraído de un arreglo
                // Comparamos el tipo base del arreglo con el valor individual
                return this.validacionTipo(tipoBase, valor, nombre);
            }
        }
        
        
        switch (tipo) {
            case "int":
                return Number.isInteger(valor)
            case "float":
                return typeof valor === 'number' && !Number.isInteger(valor)
            case "string":
                return typeof valor === 'string'
            case "boolean":
                return typeof valor === 'boolean'
            case "char":
                return typeof valor === 'string' && valor.length === 1
            case "struct":
                return valor instanceof Struct
            case "function":
                return valor instanceof Invocable
            case "instance":
                //return valor instanceof Instancia
                return true
            default:
                //return true
                throw new Error("Tipo desconocido: " + tipo)
        }
    }



    /**
     * @param {any} valor 
     * @returns {string}
     */
    
    // ESTA SIRVE PARA CUANDO SE DECLARE UN: var algo = "hola", se determine su tipo gracias al valor que trae acompañado 
    inferirTipo(valor) {
        console.log(typeof(valor))
        console.log(valor)
        if (Number.isInteger(valor)) {
            return "int";
        } else if (typeof valor === 'number') {
            return "float";
        } else if (typeof valor === 'string') {
            return valor.length === 1 ? "char" : "string";
        } else if (typeof valor === 'boolean') {
            return "boolean";
        } else if (valor instanceof Struct) {
            return "struct";
        }else if (valor instanceof Object) {
            //return valor.struct.nombre
            return "instance"
        } else if (Array.isArray(valor)) {
            // Inferimos el tipo base del arreglo
            if (valor.length > 0) {
                return this.inferirTipo(valor[0]) + "[]";
            } else {
                throw new Error("No se puede inferir el tipo de un arreglo vacío.");
            }
        } 
        else {
            throw new Error("No se pudo inferir el tipo del valor proporcionado.");
        }
    }

}


