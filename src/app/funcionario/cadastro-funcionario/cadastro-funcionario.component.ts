import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../core/model';

@Component({
  selector: 'npj-cadastro-funcionario',
  templateUrl: './cadastro-funcionario.component.html'
})
export class CadastroFuncionarioComponent implements OnInit {

  funcionario = new Funcionario();

  constructor() { }

  ngOnInit() {
  }

}
