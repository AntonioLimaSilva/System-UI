import { Component, EventEmitter, Output, Input } from '@angular/core';

import { Pessoa } from '../../core/model';

@Component({
  selector: 'npj-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  inputs: ['pessoa'],
  styleUrls: ['./modal-confirmation.component.css']
})
export class ModalConfirmationComponent {

  @Output() transferToAssistido = new EventEmitter();
  @Input() pessoa: Pessoa;

  save() {
    this.transferToAssistido.emit(this.pessoa)
  }

}
