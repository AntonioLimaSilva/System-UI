import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'npj-pagination',
  inputs: ['page'],
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit {

  @Input() totalPages: Array<number> = new Array<number>();
  @Input() page: number;

  @Output() addEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.page + 1;
  }

  setPage(pageClicked: number, event: any) {
    event.preventDefault();
    this.addEvent.emit(pageClicked);
  }

}
