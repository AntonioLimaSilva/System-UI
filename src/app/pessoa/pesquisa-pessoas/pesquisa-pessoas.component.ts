import { Component, OnInit } from '@angular/core';

import { ToastyService } from 'ng2-toasty';
import { Observable } from 'rxjs/Observable';

import { PessoaService, PessoaFilter } from '../pessoa.service';
import { Pessoa } from '../../core/model';
import { NPJ_API } from '../../npj.api';
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
    private toastyService: ToastyService
  ) { }

  ngOnInit() {
    this.pesquisar();
  }

  filtrar() {
    this.pesquisar();
  }

  setPage(page, event) {
    event.preventDefault();
    this.pesquisar(page);
  }

  pesquisar(page = 0) {
    this.filter.page = page;

    this.pessoaService.findBy(this.filter)
    .then(resultado => {
      this.pessoas = resultado.pessoas,
      this.totalPages = new Array(resultado.totalPages);
    });
  }

  remove(id: number) {
    this.pessoaService.remove(id)
      .subscribe(() => {
        this.pesquisar();

        this.toastyService.success('Pessoa excluída com sucesso');
      }, e => this.toastyService.error('Essa pessoa está sendo referênciado em outra tabela'));
  }

  getImagePath(filename: any) {
    let url = filename === "" || filename === null ? `${NPJ_API}/fotos/thumbnail.pessoa.mock.png` : `${NPJ_API}/fotos/thumbnail.${filename}`;
    return url;
  }
}
