import { Component, OnInit } from '@angular/core';
import { AssistidoService } from '../assistido.service';
import { Pessoa } from '../../core/model';

@Component({
  selector: 'npj-cadastro-assistido',
  templateUrl: './cadastro-assistido.component.html'
})
export class CadastroAssistidoComponent implements OnInit {

  pessoa: Pessoa;

  constructor(private assistidoService: AssistidoService) { }

  ngOnInit() {    
    this.assistidoService.findByPessoaId().subscribe(pessoa => { 
      this.pessoa = pessoa;
      console.log(this.pessoa);
    });
  }

}
