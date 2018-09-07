import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Assistido, Pessoa } from '../core/model';
import { API_URL } from '../api-url';
import { PessoaService } from '../pessoa/pessoa.service';

@Injectable()
export class AssistidoService {

  id: number = -1;

  constructor(
    private httpClient: HttpClient,
    private pessoaService: PessoaService
  ) { }

  save(assistido: Assistido): Observable<number> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.httpClient.post<Assistido>(`${API_URL}/assistidos`, assistido, { headers })
      .map(assistido => assistido.id);
  }

  findByPessoaId(): Observable<Pessoa> {
    if(this.id === -1) {
      return Observable.empty();
    }
    
    return this.pessoaService.findById(this.id);
  }

  findByName(nome: any): Observable<any> {
    let params = new HttpParams({fromObject: { nome }});
    return this.httpClient.get<any>(`${API_URL}/assistidos`, { params });
  }

  setIdPessoa(id: number) {
    this.id = id;
  }

}
