export class AppError {
    message:string
    constructor(msg="Something went wrong."){
        this.message = msg
    }
}