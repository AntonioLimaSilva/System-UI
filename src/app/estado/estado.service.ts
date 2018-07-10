import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ErrorHandlerService } from '../core/error-handler.service';
import { Estado } from '../core/model';
import { NPJ_API } from '../npj.api';

@Injectable()
export class EstadoService {

  constructor(
    private http: Http,
    private errorHandlerService: ErrorHandlerService
  ) { }

  findAll(): Observable<Estado[]> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${NPJ_API}/estados`, new RequestOptions({headers}))
      .map(response => response.json())
      .catch(error => Observable.throw(this.errorHandlerService.handle(error)));
  }

}
