import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';
import { Observable } from 'rxjs/Rx';

import { AssistidoService } from '../assistido.service';
import { Pessoa, Assistido } from '../../core/model';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'npj-cadastro-assistido',
  templateUrl: './cadastro-assistido.component.html'
})
export class CadastroAssistidoComponent implements OnInit {

  pessoa: any;
  assistido = new Assistido();

  constructor(
    private assistidoService: AssistidoService,
    private toastyService: ToastyService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {    
    this.assistidoService.findByPessoaId().subscribe(pessoa => {   
      this.assistido.pessoa = this.pessoa = { id: pessoa.id, nome: pessoa.nome };
    });
  }
  
  save(form: FormGroup) {
    this.assistidoService.save(this.assistido).subscribe(id => {
      form.reset();

      this.toastyService.success('Assistido salvo com sucesso');
    }, ex => {
      this.toastyService.error(ex.error[0].messageUser);
      return Observable.throw(this.errorHandlerService.handle(ex));
    })
  }

}
