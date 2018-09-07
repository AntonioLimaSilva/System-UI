import { Component, OnInit } from '@angular/core';
import { AssistidoService } from '../../assistido/assistido.service';

@Component({
  selector: 'npj-modal-object',
  templateUrl: './modal-object.component.html'
})
export class ModalObjectComponent implements OnInit {

  assistidos = [];

  constructor(private assistidoService: AssistidoService) { }

  ngOnInit() {
  }

  search(value: any) {
    this.assistidoService.findByName(value.nome).subscribe(assistidos => {
      this.assistidos = assistidos;
    });
  }

}
