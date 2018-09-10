import { Component, OnInit } from '@angular/core';

import { Processo } from '../../core/model';
import { ProcessoService } from '../processo.service';
import { API_URL } from '../../api-url';

@Component({
  selector: 'npj-cadastro-processo',
  templateUrl: './cadastro-processo.component.html'
})
export class CadastroProcessoComponent implements OnInit {

  processo: Processo = new Processo();
  assistido: any;
  url: any;

  constructor(private processoService: ProcessoService) { }

  ngOnInit() {
  }

  criar() {
    this.processoService.criar(this.processo).subscribe(id => {
      this.processo.id = id;
    })
  }

  addAssistidoProcesso(assistido: any) {
    this.url = this.getImagePath(assistido.foto);
    this.assistido = assistido;
  }

  getImagePath(filename: any) {
    let url = filename === "" || filename === null ? `${API_URL}/fotos/thumbnail.pessoa.mock.png` : `${API_URL}/fotos/thumbnail.${filename}`;
    return url;
  }

}
