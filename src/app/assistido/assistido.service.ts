import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Assistido } from '../core/model';
import { API_URL } from '../api-url';

@Injectable()
export class AssistidoService {

  constructor(private httpClient: HttpClient) { }

  save(assistido: Assistido): Observable<number> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.httpClient.post<Assistido>(`${API_URL}/assistidos`, assistido, { headers })
      .map(assistido => assistido.id);
  }

}
