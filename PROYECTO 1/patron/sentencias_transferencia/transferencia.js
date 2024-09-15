export class BreakException extends Error{

    constructor(){
        super('Break')
    }

}

export class ContinueException extends Error{

    constructor(){
        super('Break')
    }

}

export class ReturnException extends Error{

    constructor(valor){
        super('Return')
        this.valor = valor
    }

}
