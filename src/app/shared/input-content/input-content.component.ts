import { Component, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';

@Component({
  selector: 'npj-input-content',
  templateUrl: './input-content.component.html'
})
export class InputContentComponent implements AfterContentInit {

  @Input() for: string;
  @Input() label: string;
  @Input() errorMessage: string;
  @ContentChild(NgModel) model: NgModel;
  @ContentChild(FormControlName) control: FormControlName;

  input: any;

  ngAfterContentInit() {
    this.input = this.model || this.control;
    if(this.input === undefined) {
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou formControName');
    }
  }

  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched);
  }

  hasError() {
    return this.input.invalid && (this.input.dirty || this.input.touched);
  }

}
