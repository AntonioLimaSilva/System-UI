import { Component, OnInit } from '@angular/core';
import { Processo } from '../../core/model';
import { ProcessoService } from '../processo.service';

@Component({
  selector: 'npj-cadastro-processo',
  templateUrl: './cadastro-processo.component.html'
})
export class CadastroProcessoComponent implements OnInit {

  processo: Processo = new Processo();

  constructor(private processoService: ProcessoService) { }

  ngOnInit() {
  }

  criar() {
    this.processoService.criar(this.processo).subscribe(id => {
      this.processo.id = id;
    })
  }

}
