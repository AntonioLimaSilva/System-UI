import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Pessoa } from '../core/model';
import { NPJ_API } from '../npj.api';
import { ErrorHandler } from '../app.error-handler';

export class PessoaFilter {
  nome: string;
  pseudonimo: string;
  cpf: string;
  page: number = 0;
  totalItems: number = 5;
}

@Injectable()
export class PessoaService {

  constructor(private http: Http) { }

  save(pessoa: Pessoa): Observable<string> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${NPJ_API}/pessoas`, JSON.stringify(pessoa), 
      new RequestOptions({headers}))
        .map(response => response.json())
        .map(pessoa => pessoa.id)
        .catch(error => ErrorHandler.handle(error));
  }
  
  findBy(filter: PessoaFilter): Promise<any> {
    const params = new URLSearchParams();
    params.set('page', filter.page.toString());
    params.set('size', filter.totalItems.toString());
    
    if(filter.nome) {
      params.set('nome', filter.nome);
    }

    if(filter.pseudonimo) {
      params.set('pseudonimo', filter.pseudonimo);
    }

    if(filter.cpf) {
      params.set('cpf', filter.cpf);
    }

    return this.http.get(`${NPJ_API}/pessoas`, {search: params})
      .toPromise()
      .then(response => {
        const result = {
          pessoas: response.json().content,
          totalPages: response.json().totalPages
        }
        return result;
      })
      .catch(error => ErrorHandler.handle(error));
  }

}
