import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'npj-modal-remove',
  templateUrl: './modal-remove.component.html',
  inputs: ['id', 'lg'],
  styleUrls: ['./modal-remove.component.css']
})
export class ModalRemoveComponent {

  @Output() deleteFun = new EventEmitter();

  @Input() id: any;

  @Input() lg: boolean = false;

  deleteFunction() {
    this.deleteFun.emit(this.id);
  }

}
