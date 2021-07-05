export class ApplicationException extends Error{
    constructor(message:string = 'Ha ocurrrido un error'){
        super(message);
    }
}