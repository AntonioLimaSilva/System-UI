import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { NPJ_API } from '../npj.api';
import { ErrorHandlerService } from '../core/error-handler.service';

@Injectable()
export class DocumentoService {

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  upload(file: File):  Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('files', file);

    const req = new HttpRequest('POST', `${NPJ_API}/files/documento`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req)
      .map(response => response)
      .catch(error => Observable.throw(this.errorHandlerService.handle(error)));
  }

}
