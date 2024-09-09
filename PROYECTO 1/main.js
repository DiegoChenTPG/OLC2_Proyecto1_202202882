//const parser = require("./parser/parser.js")
import { parse } from "./parser/parser.js"
import { InterpreterVisitor } from "./patron/interprete.js"


const editor = document.getElementById("editor")
const boton = document.getElementById("btnEjecutar")
const consola = document.getElementById("salida")

boton.addEventListener('click', () => {
    const codigo_analizar = editor.value
    console.log(editor.value)

    try {
        const resultados = parse(codigo_analizar)
    
        const interprete = new InterpreterVisitor()
    
        for (const resultado of resultados){
            resultado.accept(interprete)
        }
        
        consola.innerHTML = interprete.salida
    
    } catch (error) {
        //manejo de errores sintacticos
        console.log(error)
        consola.innerHTML = error.message + "en la linea: " + error.location.start.line + " y columna: " + error.location.start.column
    }


})


