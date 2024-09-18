//const parser = require("./parser/parser.js")
import { parse } from "./parser/parser.js"
import { InterpreterVisitor } from "./patron/interprete.js"


const editor = document.getElementById("editor")
const boton = document.getElementById("btnEjecutar")
const consola = document.getElementById("salida")
const btnCrear = document.getElementById("btnCrear");
const btnGuardar = document.getElementById("btnGuardar");

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



// Leer archivo .oak y mostrar su contenido en el editor
fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file && file.name.endsWith('.oak')) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            editor.value = e.target.result;
        };
        
        reader.readAsText(file);
    } else {
        alert('Solo se permiten archivos con extensión .oak');
    }
})

// Crear un nuevo archivo (limpiar el editor)
btnCrear.addEventListener('click', () => {
    editor.value = ''; // Limpiar el textarea para crear un nuevo archivo
    consola.innerHTML = ''; // Limpiar la consola si es necesario
})

// Guardar el contenido del editor en un archivo .oak
btnGuardar.addEventListener('click', () => {
    const contenido = editor.value;
    const nombreArchivo = 'archivo.oak'; // Nombre del archivo a guardar

    const blob = new Blob([contenido], { type: 'text/plain' });
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(blob);
    enlace.download = nombreArchivo;

    enlace.click();
    URL.revokeObjectURL(enlace.href); // Limpiar la URL generada
})
