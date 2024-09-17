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
    /**
     * @param {any} value
     */
    constructor(valor){
        super('Return')
        this.valor = valor
        console.log(valor + "REVISANDO EL RETURN en eXPCEPTION")
    }

}
