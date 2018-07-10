import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import * as moment from 'moment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Pessoa } from '../core/model';
import { NPJ_API } from '../npj.api';
import { ErrorHandlerService } from '../core/error-handler.service';

export class PessoaFilter {
  nome: string;
  pseudonimo: string;
  cpf: string;
  page: number = 0;
  totalItems: number = 5;
}

@Injectable()
export class PessoaService {

  constructor(
    private http: Http,
    private errorHandlerService: ErrorHandlerService
  ) { }

  save(pessoa: Pessoa): Observable<string> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${NPJ_API}/pessoas`, JSON.stringify(pessoa), 
      new RequestOptions({headers}))
        .map(response => response.json())
        .map(pessoa => pessoa.id)
        .catch(error => Observable.throw(this.errorHandlerService.handle(error)));
  }

  update(pessoa: Pessoa): Observable<Pessoa> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${NPJ_API}/pessoas/${pessoa.id}`, JSON.stringify(pessoa), 
      new RequestOptions({headers}))
      .map(response => response.json() as Pessoa)
      .catch(error => Observable.throw(this.errorHandlerService.handle(error)));
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
      .catch(error => this.errorHandlerService.handle(error));
  }

  findById(id: number): Observable<Pessoa> {
    return this.http.get(`${NPJ_API}/pessoas/${id}`)
      .map(response => response.json())
      .catch(error => Observable.throw(this.errorHandlerService.handle(error)));
  }

  upload(files: any) {
    const formData = new FormData();
    formData.append('files', files);

    return this.http.post(`${NPJ_API}/fotos`, formData)
      .map(response => response.json())
      .catch(error => Observable.throw(this.errorHandlerService.handle(error)));
  }

  remove(id: number): Observable<void> {
    return this.http.delete(`${NPJ_API}/pessoas/${id}`)
      .map(() => null)
      .catch(error => Observable.throw(this.errorHandlerService.handle(error)));
  }

}
