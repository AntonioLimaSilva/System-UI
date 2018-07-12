import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ErrorHandlerService } from '../core/error-handler.service';
import { Estado } from '../core/model';
import { API_URL } from '../api-url';

@Injectable()
export class EstadoService {

  constructor(
    private http: Http,
    private errorHandlerService: ErrorHandlerService
  ) { }

  findAll(): Observable<Estado[]> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${API_URL}/estados`, new RequestOptions({headers}))
      .map(response => response.json())
      .catch(error => Observable.throw(this.errorHandlerService.handle(error)));
  }

}
