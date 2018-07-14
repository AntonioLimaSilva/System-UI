import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastyService } from 'ng2-toasty';

@Injectable()
export class ErrorHandlerService {

  constructor() { }

  handle(error: any) {
    let errorMessage: string;

    if(error instanceof HttpErrorResponse) {
        errorMessage = `Erro ${error.status} ao acessar a url ${error.url} - ${error.statusText}`;
    } else {
        errorMessage = error.toString();
    }

    console.log(errorMessage);
  }

}
