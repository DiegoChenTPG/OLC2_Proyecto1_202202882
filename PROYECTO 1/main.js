//const parser = require("./parser/parser.js")
import { parse } from "./parser/parser.js"
const editor = document.getElementById("editor")
const boton = document.getElementById("btnEjecutar")
const consola = document.getElementById("salida")

boton.addEventListener('click', () => {
    const codigo_analizar = editor.value
    
    const resultado = parse(codigo_analizar)
    
    consola.innerHTML = editor.value
    console.log("hola")

})


