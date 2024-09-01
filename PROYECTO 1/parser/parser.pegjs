inicio = instrucciones
  
instrucciones = instruccion instrucciones
                / instruccion

instruccion = expresion

expresion = N_ENTERO "+" N_ENTERO 
            / N_ENTERO "-" N_ENTERO
            / N_ENTERO "*" N_ENTERO
            / N_ENTERO "/" N_ENTERO
            / DECIMAL "+" DECIMAL 
            / DECIMAL "-" DECIMAL
            / DECIMAL "*" DECIMAL
            / DECIMAL "/" DECIMAL


DECIMAL =  [0-9]+(.[0-9]+)        
N_ENTERO = [0-9]+ 
ID = [a-zA-Z0-9_]+  


_"whitespace"
  = [ \t\n\r]*

