import { Component, OnInit } from '@angular/core';
import { Documento } from '../../core/model';
import { DocumentoService, DocumentoFilter } from '../documento.service';
import { ToastyService } from 'ng2-toasty';
import { Observable } from 'rxjs/Rx';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'npj-pesquisa-documentos',
  templateUrl: './pesquisa-documentos.component.html'
})
export class PesquisaDocumentosComponent implements OnInit {

  totalPages: Array<number>;
  documentos: Documento[];
  filter = new DocumentoFilter();

  constructor(
    private documentoService: DocumentoService,
    private toastyService: ToastyService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.search();
  }

  search() {
    this.findBy();
  }
  
  findBy(page = 0) {
    this.filter.page = page;

    this.documentoService.findBy(this.filter)
      .subscribe(documentos => {
        this.documentos = documentos.content;
        this.totalPages = new Array(documentos.totalPages);
      }, ex => {
        this.toastyService.error(ex.error);
        return Observable.throw(this.errorHandlerService.handle(ex));
    });
  }

  setPage(page, event) {
    event.preventDefault();

    this.findBy(page);
  }

  remove(id: number) {
    this.documentoService.remove(id).subscribe(() => {
      this.findBy();

      this.toastyService.success('Documento excluído com sucesso!');
    }, ex => {
      this.toastyService.error(ex.error[0].messageUser);
      return Observable.throw(this.errorHandlerService.handle(ex));
    });
  }

}
