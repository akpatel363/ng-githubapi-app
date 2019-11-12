import { ErrorHandler } from '@angular/core';
import { NothingFoundError } from './nothing-found.error';
import { NoConnectionError } from './no-connection.error';

export class AppErrorHandler implements ErrorHandler{
    handleError(error){
        console.log(error)
        if(error instanceof NothingFoundError){
            console.log("Nothing Found.....")
        }else if(error instanceof NoConnectionError){
            console.log("No Connection\nPlease Refresh.....")
        }else{
            console.log("Unknown Error\nPlease Refresh.....")
        }
    }
}