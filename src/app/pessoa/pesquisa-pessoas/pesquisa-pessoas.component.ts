import { Component, OnInit } from '@angular/core';

import { ToastyService } from 'ng2-toasty';
import { Observable } from 'rxjs/Rx';

import { PessoaService, PessoaFilter } from '../pessoa.service';
import { Pessoa } from '../../core/model';
import { API_URL } from '../../api-url';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'npj-pesquisa-pessoas',
  templateUrl: './pesquisa-pessoas.component.html'
})
export class PesquisaPessoasComponent implements OnInit {

  totalPages: Array<number>;
  pessoas: Pessoa[];
  filter = new PessoaFilter();

  constructor(
    private pessoaService: PessoaService,
    private toastyService: ToastyService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.search()
  }

  search() {
    this.findBy();
  }

  setPage(page) {
    this.findBy(page);
  }

  findBy(page = 0) {
    this.filter.page = page;

    this.pessoaService.findBy(this.filter).subscribe(resultado => {
      this.pessoas = resultado.pessoas,
      this.totalPages = new Array(resultado.totalPages);
    });
  }

  setFirstPage() {
    this.findBy();
  }

  setLastPage(totalPages: any) {
    let page = totalPages.length - 1;
    this.findBy(page);
  }

  remove(id: number) {
    this.pessoaService.remove(id).subscribe(() => {
        this.findBy();

        this.toastyService.success('Pessoa excluída com sucesso');
      }, ex => {
        this.toastyService.error(ex.error[0].messageUser);
        return Observable.throw(this.errorHandlerService.handle(ex));
      });
  }
}
