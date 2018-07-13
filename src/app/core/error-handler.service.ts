import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { ToastyService } from 'ng2-toasty';

@Injectable()
export class ErrorHandlerService {

  constructor() { }

  handle(erro: Response | any) {
    let errorMessage: string;

    if(erro instanceof Response) {
        errorMessage = `Erro ${erro.status} ao acessar a url ${erro.url} - ${erro.statusText}`;
    } else {
        errorMessage = erro.toString();
    }

    console.log(errorMessage);
  }

}
