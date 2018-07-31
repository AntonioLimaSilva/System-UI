import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { PessoaService } from '../pessoa/pessoa.service';
import { Pessoa, Funcionario } from '../core/model';
import { map } from 'rxjs/operators';
import { API_URL } from '../api-url';

@Injectable()
export class FuncionarioService {

  idPessoa: number = -1;

  constructor(
    private httpClient: HttpClient,
    private pessoaService: PessoaService
  ) { }

  setIdPessoa(idPessoa: number) {
    this.idPessoa = idPessoa;
  }

  findByPessoaId(): Observable<Pessoa> {
    if(this.idPessoa == -1) {
      return Observable.empty();
    } 

    return this.pessoaService.findById(this.idPessoa);
  }

  save(funcionario: Funcionario): Observable<number> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.httpClient.post<Funcionario>(`${API_URL}/funcionarios`, funcionario, {headers})
      .map(funcionario => funcionario)
      .map(id => funcionario.id);
  }

}
