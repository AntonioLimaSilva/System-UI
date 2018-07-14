import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Pessoa } from '../core/model';
import { API_URL } from '../api-url';

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
    private httpClient: HttpClient
  ) { }

  save(pessoa: Pessoa): Observable<number> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.httpClient.post<Pessoa>(`${API_URL}/pessoas`, pessoa, {headers})
        .map(response => response)
        .map(pessoa => pessoa.id);
  }

  update(pessoa: Pessoa): Observable<Pessoa> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.httpClient.put<Pessoa>(`${API_URL}/pessoas/${pessoa.id}`, pessoa, {headers})
      .map(response => response);
  }
  
  findBy(filter: PessoaFilter): Observable<any> {
    let params = new HttpParams({
      fromObject: {
        page: filter.page.toString(),
        size:  filter.totalItems.toString()
      }
    });
    
    if(filter.nome) {
      params = params.append('nome', filter.nome);
    }

    if(filter.pseudonimo) {
      params = params.append('pseudonimo', filter.pseudonimo);
    }

    if(filter.cpf) {
      params = params.append('cpf', filter.cpf);
    }

    return this.httpClient.get<any>(`${API_URL}/pessoas`, { params})
      .map(response => {
        const result = {
          pessoas: response.content,
          totalPages: response.totalPages
        }
        return result;
      });
  }

  findById(id: number): Observable<Pessoa> {
    return this.httpClient.get<Pessoa>(`${API_URL}/pessoas/${id}`)
      .map(response => response);
  }

  upload(files: any): Observable<any> {
    const formData = new FormData();
    formData.append('files', files);

    return this.httpClient.post(`${API_URL}/fotos`, formData)
      .map(response => response);
  }

  remove(id: number): Observable<void> {
    return this.httpClient.delete(`${API_URL}/pessoas/${id}`)
      .map(() => null);
  }

}
