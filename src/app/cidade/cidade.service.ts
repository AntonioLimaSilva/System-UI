import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Cidade } from '../core/model';
import { NPJ_API } from '../npj.api';
import { ErrorHandler } from '../app.error-handler';

@Injectable()
export class CidadeService {

  constructor(
    private http: Http
  ) { }

  findByEstadoId(idEstado: number): Observable<Cidade[]> {
    return this.http.get(`${NPJ_API}/cidades/${idEstado}`)
      .map(response => response.json())
      .catch(error => ErrorHandler.handle(error));
  }

}
