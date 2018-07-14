import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Cidade } from '../core/model';
import { API_URL } from '../api-url';

@Injectable()
export class CidadeService {

  constructor(
    private httpClient: HttpClient
  ) { }

  findByEstadoId(idEstado: number): Observable<Cidade[]> {
    return this.httpClient.get<Cidade[]>(`${API_URL}/cidades/${idEstado}`)
      .map(response => response);
  }

}
