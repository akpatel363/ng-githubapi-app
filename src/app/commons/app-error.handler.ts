import { ErrorHandler } from '@angular/core';
import { NothingFoundError } from './nothing-found.error';
import { NoConnectionError } from './no-connection.error';

export class AppErrorHandler implements ErrorHandler{
    handleError(error){
        console.log(error)
        if(error instanceof NothingFoundError){
            alert("Nothing Found.....")
        }else if(error instanceof NoConnectionError){
            alert("No Connection\nPlease Refresh.....")
        }else{
            alert("Unknown Error\nPlease Refresh.....")
        }
    }
}