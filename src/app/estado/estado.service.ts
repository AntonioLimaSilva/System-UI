import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Estado } from '../core/model';
import { API_URL } from '../api-url';

@Injectable()
export class EstadoService {

  constructor(
    private httpClient: HttpClient
  ) { }

  findAll(): Observable<Estado[]> {
    return this.httpClient.get<Estado[]>(`${API_URL}/estados`)
      .map(response => response);
  }

}
