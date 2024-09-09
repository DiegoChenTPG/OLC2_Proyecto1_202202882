{
  const crearNodo = (tipoNodo, propiedades) => {
    const tipos = {
      'numero': nodos.Numero, 
      'agrupacion': nodos.Agrupacion,
      'binaria': nodos.OperacionBinaria,
      'unaria': nodos.OperacionUnaria,
      'declaracionVariable': nodos.DeclaracionVariable,
      'accesoVariable': nodos.AccesoVariable,
      'print': nodos.Print,
      'asignacion': nodos.Asignacion,
      'expresionStmt': nodos.ExpresionStmt,
      'bloque': nodos.Bloque,
      'if': nodos.If,
      'while': nodos.While,
      'for': nodos.For,
      'break': nodos.Break,
      'continue': nodos.Continue,
      'return': nodos.Return,
      'llamada': nodos.Llamada
    }
    const nodo = new tipos[tipoNodo](propiedades)
    nodo.location = location()
    return nodo
  }
}


programa = _ dcl:Declaracion* _ { return dcl }

Declaracion = dcl:Declaracion_Variable _ ";" _ { return dcl }
            / stmt:Sentencias _ { return stmt }


Declaracion_Variable = "var" _ id:ID _ "=" _ exp:Expresion _ { return crearNodo('declaracionVariable', { id, exp }) }
                    / Tipo _ ID _ "=" _ Expresion _ 
                    / Tipo _ id:ID _



// AQUI EN LOS STATEMENT IRIAN INSTRUCCIONES (ESTRUCTURAS DE CONTROL) 
Sentencias = "System.out.println(" _ exp:Expresion _ ")" _ ";" _ { return crearNodo('print', { exp }) }
    / "{" _ dcls:Declaracion* _ "}" {return crearNodo('bloque', {dcls})}
    / "if" _ "(" _ condicion:Expresion _ ")" _ sentenciasTrue:Sentencias sentenciasFalse:(
      _ "else" _ sentenciasFalse:Sentencias {return sentenciasFalse})? {return crearNodo('if', {condicion, sentenciasTrue, sentenciasFalse})}
    / "while" _ "(" _ condicion:Expresion _ ")" _ sentencias:Sentencias {return crearNodo('while', {condicion, sentencias})}
    / "for" _ "(" _ inicializacion:(Declaracion_Variable / Expresion) _ ";" _ condicion:Expresion _ ";" _ actualizacion:Expresion ")" _ sentencias:Sentencias {return crearNodo("for", {inicializacion, condicion, actualizacion, sentencias})}
    / "break" _ ";" {return crearNodo('break')}
    / "continue" _ ";" {return crearNodo('continue')}
    / "return" _ exp:Expresion? _ ";" {return crearNodo('return', {exp})}
    / exp:Expresion _ ";" { return crearNodo('expresionStmt', { exp }) } //PASAMOS ESTO HASTA ABAJO POR PRECEDENCIA
Expresion = Asignacion

Asignacion = id:ID _ "=" _ asignacion:Asignacion {return crearNodo('asignacion', {id, asignacion})}
          / Or

Or = izq:And expansion:(
  _ op:"||" _ der:And { return { tipo: op, der } }
)* { 
  return expansion.reduce(
    (operacionAnterior, operacionActual) => {
      const { tipo, der } = operacionActual
      return crearNodo('binaria', { op:tipo, izq: operacionAnterior, der })
    },
    izq
  )
}

And = izq:Comparativos expansion:(
  _ op:"&&" _ der:Comparativos { return { tipo: op, der } }
)* { 
  return expansion.reduce(
    (operacionAnterior, operacionActual) => {
      const { tipo, der } = operacionActual
      return crearNodo('binaria', { op:tipo, izq: operacionAnterior, der })
    },
    izq
  )
}

Comparativos = izq:Relacionales expansion:(
  _ op:("==" / "!=") _ der:Relacionales { return { tipo: op, der } }
)* { 
  return expansion.reduce(
    (operacionAnterior, operacionActual) => {
      const { tipo, der } = operacionActual
      return crearNodo('binaria', { op:tipo, izq: operacionAnterior, der })
    },
    izq
  )
}

Relacionales = izq:Suma expansion:(
  _ op:(">=" / "<=" / "<" / ">" ) _ der:Suma { return { tipo: op, der } }
)* { 
  return expansion.reduce(
    (operacionAnterior, operacionActual) => {
      const { tipo, der } = operacionActual
      return crearNodo('binaria', { op:tipo, izq: operacionAnterior, der })
    },
    izq
  )
}

Suma = izq:Multiplicacion expansion:(
  _ op:("+" / "-") _ der:Multiplicacion { return { tipo: op, der } }
)* { 
  return expansion.reduce(
    (operacionAnterior, operacionActual) => {
      const { tipo, der } = operacionActual
      return crearNodo('binaria', { op:tipo, izq: operacionAnterior, der })
    },
    izq
  )
}

Multiplicacion = izq:Unaria expansion:(
  _ op:("*" / "/" / "%") _ der:Unaria { return { tipo: op, der } }
)* {
    return expansion.reduce(
      (operacionAnterior, operacionActual) => {
        const { tipo, der } = operacionActual
        return crearNodo('binaria', { op:tipo, izq: operacionAnterior, der })
      },
      izq
    )
}

Unaria = op:("-"/"!") _ num:Unaria { return crearNodo('unaria', { op: op, exp: num }) }
/ Llamada

Llamada = callee:Valor _ params:("(" args: Argumentos? ")" {return args})* {
  return params.reduce(
    (callee, args) => {
      return crearNodo('llamada', {callee, args: args || []})
    },
    callee
  )
}

Argumentos = arg:Expresion _ args:("," _ exp:Expresion {return exp})* {return [arg, ...args]}

// { return{ tipo: "numero", valor: parseFloat(text(), 10) } }
Valor = DECIMAL {return crearNodo('numero', { valor: parseFloat(text()) })} 
  / N_ENTERO {return crearNodo('numero', { valor: parseInt(text()) })}
  / TEXTO {return crearNodo('numero', { valor: String(text().slice(1, -1)) /* Se quitan las comillas dobles*/})}
  / CHAR {return crearNodo('numero', { valor: String(text().slice(1, -1)) /* Se quitan las comillas dobles */})}
  / ("true"/"false") {return crearNodo('numero', { valor: JSON.parse(text()) /* el JSON.parse se usa para convertir los string a su valor bool*/})}
  / "(" _ exp:Expresion _ ")" { return crearNodo('agrupacion', { exp }) }
  / id:ID { return crearNodo('accesoVariable', { id }) }


Tipo = "int"
      / "float"
      / "string"
      / "boolean"
      / "char"

DECIMAL =  [0-9]+(.[0-9]+)        
N_ENTERO = [0-9]+ 
ID = [_a-zA-Z_][_a-zA-Z0-9_]* { return text() }
TEXTO = '"'[^\"]*'"'
CHAR = "'" [^\"]? "'"

_ = ([ \t\n\r] / Comentario)*

Comentario = Comentario_Simple
  / Comentario_Multilinea

Comentario_Simple
  = "//" [^\n]*  

Comentario_Multilinea
  = "/*" (!"*/" .)* "*/" 
