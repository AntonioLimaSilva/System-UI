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
  @Output() firstPageEvent = new EventEmitter();
  @Output() lastPageEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.page + 1;
  }

  setFirstPage() {
    this.firstPageEvent.emit();
  }

  setLastPage(totalPages) {
    this.lastPageEvent.emit(totalPages);
  }

  setPage(pageClicked: number, event: any) {
    event.preventDefault();
    this.addEvent.emit(pageClicked);
  }

}
