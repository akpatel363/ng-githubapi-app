import { HttpErrorResponse } from '@angular/common/http';

export class AppError {
    constructor(private error?:HttpErrorResponse){}
}