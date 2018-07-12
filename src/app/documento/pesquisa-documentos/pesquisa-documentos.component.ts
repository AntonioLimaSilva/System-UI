import { Component, OnInit } from '@angular/core';
import { Documento } from '../../core/model';
import { DocumentoService, DocumentoFilter } from '../documento.service';
import { ToastyService } from 'ng2-toasty';

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
    private toastyService: ToastyService
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
      }, 
      ex => this.toastyService.error('Erro na consulta de documentos'));
  }

  setPage(page, event) {
    event.preventDefault();

    this.findBy(page);
  }

}
