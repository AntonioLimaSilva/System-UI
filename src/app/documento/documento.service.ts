import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { NPJ_API } from '../npj.api';
import { ErrorHandlerService } from '../core/error-handler.service';
import { Documento } from '../core/model';

@Injectable()
export class DocumentoService {

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  upload(file: File):  Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('files', file);

    const req = new HttpRequest('POST', `${NPJ_API}/files`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req)
      .map(response => response)
      .catch(error => Observable.throw(this.errorHandlerService.handle(error)));
  }

  save(documento: Documento): Observable<Documento> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post(`${NPJ_API}/documentos`, JSON.stringify(documento), {headers})
      .map(response => response)
      .catch(error => Observable.throw(this.errorHandlerService.handle(error)));
  }

}
