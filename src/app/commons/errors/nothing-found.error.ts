import { AppError } from './app.error';
export class NothingFoundError extends AppError{
    constructor(){
        super("Nothing found.")
    }
}