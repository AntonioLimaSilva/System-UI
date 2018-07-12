import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { API_URL } from '../api-url';
import { ErrorHandlerService } from '../core/error-handler.service';
import { Documento } from '../core/model';

export class DocumentoFilter {
  nome: string = '';
  descricao: string = '';
  page: number = 0;
  totalItems: number = 5;
}

@Injectable()
export class DocumentoService {

  constructor(
    private httpClient: HttpClient,
    private http: Http,
    private errorHandlerService: ErrorHandlerService
  ) { }

  upload(file: File):  Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('files', file);

    const req = new HttpRequest('POST', `${API_URL}/files`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.httpClient.request(req)
      .map(response => response)
      .catch(error => Observable.throw(this.errorHandlerService.handle(error)));
  }

  save(documento: Documento): Observable<Documento> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${API_URL}/documentos`, JSON.stringify(documento), {headers})
      .map(response => response.json())
      .catch(error => Observable.throw(this.errorHandlerService.handle(error)));
  }

  update(documento: Documento): Observable<Documento> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${API_URL}/documentos/${documento.id}`, JSON.stringify(documento),
      new RequestOptions({headers}))
      .map(response => response.json())
      .catch(error => Observable.throw(this.errorHandlerService.handle(error)));
  }

  findBy(filter: DocumentoFilter): Observable<any> {
    const params = new URLSearchParams();
    params.set('page', filter.page.toString());
    params.set('size', filter.totalItems.toString());

    if(filter.nome) {
      params.set('nome', filter.nome);
    }

    if(filter.descricao) {
      params.set('descricao', filter.descricao);
    }

    return this.http.get(`${API_URL}/documentos`, {params})     
      .map(response => { 
       const content = { 
          content: response.json().content,
          totalPages: response.json().totalPages
        };

        return content;
      })
      .catch(error => Observable.throw(this.errorHandlerService.handle(error)));
  }

  findById(id: number): Observable<Documento> {
    return this.http.get(`${API_URL}/documentos/${id}`)
      .map(response => response.json())
      .catch(error => Observable.throw(this.errorHandlerService.handle(error)));
  }

}
