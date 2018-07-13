import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { API_URL } from '../api-url';
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
    private httpClient: HttpClient
  ) { }

  upload(file: File):  Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('files', file);

    const req = new HttpRequest('POST', `${API_URL}/files`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.httpClient.request(req)
      .map(response => response);
  }

  save(documento: Documento): Observable<Documento> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.httpClient.post<Documento>(`${API_URL}/documentos`, documento, {headers})
      .map(response => response);
  }

  update(documento: Documento): Observable<Documento> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.httpClient.put<Documento>(`${API_URL}/documentos/${documento.id}`, documento, {headers})
      .map(response => null);
  }

  findBy(filter: DocumentoFilter): Observable<any> {
    let params = new HttpParams({
      fromObject: {
        page:  filter.page.toString(),
        size: filter.totalItems.toString()
      }
    });

    if(filter.nome) {
      params = params.append('nome', filter.nome);
    }

    if(filter.descricao) {
      params = params.append('descricao', filter.descricao);
    }

    return this.httpClient.get<any>(`${API_URL}/documentos`, {params})     
      .map(response => { 
       const content = { 
          content: response.content,
          totalPages: response.totalPages
        };

        return content;
      });
  }

  remove(id: number): Observable<void> {
    return this.httpClient.delete(`${API_URL}/documentos/${id}`)
      .map(() => null);
  }

  findById(id: number): Observable<Documento> {
    return this.httpClient.get<Documento>(`${API_URL}/documentos/${id}`)
      .map(response => response);
  }

}
