import { Invocable } from "./invocable.js";

class FuncionNativa extends Invocable{

    constructor(aridad, func){
        super()
        this.aridad = aridad
        this.invocar = func
    }

}

export const nativas = {
    'time': new FuncionNativa(() => 0, () => new Date().toISOString())
    // aqui iria toUpperCase, toLowerCase etc
}