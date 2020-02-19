import { AppError } from './app.error';
export class NoConnectionError extends AppError{
    constructor(){
        super("No internet connection.")
    }
}