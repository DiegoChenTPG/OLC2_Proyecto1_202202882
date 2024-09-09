export class Entorno{
    /**
     * 
     * @param {Entorno} padre 
     */
    constructor(padre = undefined){
        this.valores = {}       // HashMap
        this.padre = padre
    }


    setVariable(nombre, valor){

        this.valores[nombre] = valor

    }

    getVariable(nombre){

        const valorActual = this.valores[nombre]

        if(valorActual !== undefined) return valorActual // SI EL VALOR ACTUAL EXISTE LO MANDAMOS
        // SE USA EL !== undefined, ya que el 0 se considera un false aca y no entraria a la condicion en caso de que una variable tenga 0 como valor

        if (valorActual === undefined && this.padre){ // y lo mismo aca con el ===, ya que si hacemos == undefined, el 0 tambien se considera undefined asi que ===
            
            // si no existe en el bloque va a buscar a su padre(el entorno superior por decirlo) y lo devuelve
            return this.padre.getVariable(nombre)
        }

        throw new Error("Variable $",nombre, "no definida")
        
    }


    asignarVariable(nombre, valor){

        const valorActual = this.valores[nombre]

        if(valorActual !== undefined) {
            this.valores[nombre] = valor
            return
        }
            
        if (valorActual === undefined && this.padre){
            this.padre.asignarVariable(nombre, valor)
            return
        }

        throw new Error("Variable $",nombre, "no definida")


    }
}