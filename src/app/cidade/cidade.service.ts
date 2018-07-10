import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Cidade } from '../core/model';
import { NPJ_API } from '../npj.api';
import { ErrorHandlerService } from '../core/error-handler.service';

@Injectable()
export class CidadeService {

  constructor(
    private http: Http,
    private errorHandlerService: ErrorHandlerService
  ) { }

  findByEstadoId(idEstado: number): Observable<Cidade[]> {
    return this.http.get(`${NPJ_API}/cidades/${idEstado}`)
      .map(response => response.json())
      .catch(error => Observable.throw(this.errorHandlerService.handle(error)));
  }

}
