import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { API_URL } from '../../api-url';

@Component({
  selector: 'npj-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

  @Input() objects: any[];
  @Output() removeEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  remove(id: number) {
    this.removeEvent.emit(id);
  }

  getImagePath(filename: any) {
    let url = filename === "" || filename === null ? `${API_URL}/fotos/thumbnail.pessoa.mock.png` : `${API_URL}/fotos/thumbnail.${filename}`;
    return url;
  }
}
