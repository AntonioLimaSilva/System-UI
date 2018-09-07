import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Processo } from '../core/model';
import { API_URL } from '../api-url';

@Injectable()
export class ProcessoService {

  constructor(private httpClient: HttpClient) { }

  criar(processo: Processo): Observable<number> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    return this.httpClient.post<number>(`${API_URL}/processos`, processo, {headers})
      .map(id => id);
  }

}
