import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';
import { Observable } from 'rxjs/Rx';

import { Funcionario } from '../../core/model';
import { FuncionarioService } from '../funcionario.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'npj-cadastro-funcionario',
  templateUrl: './cadastro-funcionario.component.html'
})
export class CadastroFuncionarioComponent implements OnInit {

  pessoa: any;

  funcionario = new Funcionario();

  constructor(
    private funcionarioService: FuncionarioService,
    private toastyService: ToastyService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.funcionarioService.findByPessoaId().subscribe(pessoa => {
      this.funcionario.pessoa = this.pessoa = { id: pessoa.id, nome: pessoa.nome }
    });
  }

  save(form: FormGroup) {
    this.funcionarioService.save(this.funcionario).subscribe(id => {
      form.reset();

      this.toastyService.success('Funcionário salvo com sucesso!');
    }, ex => {
      this.toastyService.error('Erro tentando salvar funcionário');
      return Observable.throw(this.errorHandlerService.handle(ex.error[0].messageUser));
    })
  }

}
