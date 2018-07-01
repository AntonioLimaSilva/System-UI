import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { PessoaService, PessoaFilter } from '../pessoa.service';
import { Pessoa } from '../../core/model';

@Component({
  selector: 'npj-pesquisa-pessoas',
  templateUrl: './pesquisa-pessoas.component.html'
})
export class PesquisaPessoasComponent implements OnInit {

  totalPages: Array<number>;
  pessoas: Pessoa[];
  filter = new PessoaFilter();

  constructor(
    private pessoaService: PessoaService
  ) { }

  ngOnInit() {
    this.pesquisar();
  }

  setPage(page, event) {
    event.preventDefault();
    this.pesquisar(page);
  }

  pesquisar(pagina = 0) {
    this.filter.page = pagina;

    this.pessoaService.findBy(this.filter)
    .then(resultado => {
      this.pessoas = resultado.pessoas,
      this.totalPages = new Array(resultado.totalPages);
    });
  }

}
