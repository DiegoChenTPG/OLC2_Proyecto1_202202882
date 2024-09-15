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
      'llamada': nodos.Llamada,
      'declaracionFuncion': nodos.DeclaracionFuncion,
      'declaracionStruct': nodos.DeclaracionStruct,
      'instancia': nodos.Instancia,
      'get': nodos.Get,
      'set': nodos.Set
    }
    const nodo = new tipos[tipoNodo](propiedades)
    nodo.location = location()
    return nodo
  }
}


programa = _ dcl:Declaracion* _ { return dcl }

Declaracion = dcl:Declaracion_Variable _ ";" _ { return dcl }
            / dclF:Declaracion_Funcion _ {return dclF} 
            / dclS: Declaracion_Struct _ {return dclS}
            / stmt:Sentencias _ { return stmt }


Declaracion_Variable = "var" _ id:ID _ "=" _ exp:Expresion _ { return crearNodo('declaracionVariable', { tipo: null, id, exp }) }
                    / tipo:Tipo _ id:ID _ exp:("=" _ exp:Expresion {return exp})? _ { return crearNodo('declaracionVariable', { tipo, id, exp: exp || null }) }


Declaracion_Funcion = "void" _ id:ID _ "(" _ parametros:Parametros? _ ")" _ bloque:Bloque {return crearNodo('declaracionFuncion', {id, parametros: parametros || [], bloque})}

Parametros = id:ID _ parametros:(","_ ids:ID {return ids})* {return [id, ...parametros]}


Declaracion_Struct =  "struct" _ id:ID _ "{" _ declaraciones:Cuerpo_Struct* _ "}" {return crearNodo('declaracionStruct', {id, declaraciones}) }

Cuerpo_Struct = dcl:Declaracion_Variable _ ";" _ {return dcl}
              / dcl:Declaracion_Funcion _ {return dcl}


// AQUI EN LOS STATEMENT IRIAN INSTRUCCIONES (ESTRUCTURAS DE CONTROL) 
Sentencias = "System.out.println(" _ exp:Expresion _ ")" _ ";" _ { return crearNodo('print', { exp }) }
    / Bloque
    / "if" _ "(" _ condicion:Expresion _ ")" _ sentenciasTrue:Sentencias sentenciasFalse:(
      _ "else" _ sentenciasFalse:Sentencias {return sentenciasFalse})? {return crearNodo('if', {condicion, sentenciasTrue, sentenciasFalse})}
    / "while" _ "(" _ condicion:Expresion _ ")" _ sentencias:Sentencias {return crearNodo('while', {condicion, sentencias})}
    / "for" _ "(" _ inicializacion:(Declaracion_Variable / Expresion) _ ";" _ condicion:Expresion _ ";" _ actualizacion:Expresion ")" _ sentencias:Sentencias {return crearNodo("for", {inicializacion, condicion, actualizacion, sentencias})}
    / "break" _ ";" {return crearNodo('break')}
    / "continue" _ ";" {return crearNodo('continue')}
    / "return" _ exp:Expresion? _ ";" {return crearNodo('return', {exp})}
    / exp:Expresion _ ";" { return crearNodo('expresionStmt', { exp }) } //PASAMOS ESTO HASTA ABAJO POR PRECEDENCIA

Bloque = "{" _ dcls:Declaracion* _ "}" {return crearNodo('bloque', {dcls})}

Expresion = Asignacion


Asignacion = asignado:Llamada _ "=" _ asignacion:Asignacion
  {

    if (asignado instanceof nodos.AccesoVariable) {
      return crearNodo('asignacion', { id: asignado.id, asignacion })
    }

    if (!(asignado instanceof nodos.Get)) {
      throw new Error('Solo se pueden asignar valores a propiedades de objetos')
    }

    return crearNodo('set', {objetivo:asignado.objetivo, propiedad: asignado.propiedad, valor:asignacion})
  }

/Or


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


Llamada = objetivoInicial:Valor _ 
  operaciones:(
    ("(" _ args: Argumentos? _ ")" {return {args, tipo: 'funcCall'}}) 
    / ("." _ id: ID _ {return {id, tipo: 'get'}})
  )* {
  const op = operaciones.reduce(
    (objetivo, args) => {

      const {tipo, id, args:argumentos} = args

      if(tipo === 'funcCall'){
        return crearNodo('llamada', {callee: objetivo, args: argumentos || [] })
      } else if( tipo === 'get'){
        return crearNodo('get', {objetivo, propiedad:id})
      }
    },
    objetivoInicial
  )
return op
}



Argumentos = arg:Expresion _ args:("," _ exp:Expresion {return exp})* {return [arg, ...args]}

// { return{ tipo: "numero", valor: parseFloat(text(), 10) } }
Valor = DECIMAL {return crearNodo('numero', { valor: parseFloat(text()) })} 
  / N_ENTERO {return crearNodo('numero', { valor: parseInt(text()) })}
  / TEXTO {return crearNodo('numero', { valor: String(text().slice(1, -1)) /* Se quitan las comillas dobles*/})}
  / CHAR {return crearNodo('numero', { valor: String(text().slice(1, -1)) /* Se quitan las comillas dobles */})}
  / ("true"/"false") {return crearNodo('numero', { valor: JSON.parse(text()) /* el JSON.parse se usa para convertir los string a su valor bool*/})}
  / "(" _ exp:Expresion _ ")" { return crearNodo('agrupacion', { exp }) }
  / "new" _ id:ID _ "(" _ argumentos:Argumentos? _ ")" {return crearNodo('instancia', {id, args:argumentos || []})}
  / id:ID { return crearNodo('accesoVariable', { id }) }



Tipo = "int" {return 'int'}
      / "float" {return 'float'}
      / "string" {return 'string'}
      / "boolean" {return 'boolean'}
      / "char" {return 'char'}

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
