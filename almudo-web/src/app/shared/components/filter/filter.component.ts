import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  public queryString: string;
  public stars: any;
  public all: any;

  @Output() succes = new EventEmitter<string>();
  @Output() star = new EventEmitter<number>();

  constructor() {
    this.all = { number: 0, checked: true };
    this.stars = [{ number: 1, checked: false },
    { number: 2, checked: false }, { number: 3, checked: false },
    { number: 4, checked: false }, { number: 5, checked: false },
    { number: 6, checked: false }].reverse();
  }

  ngOnInit() {
  }

  public getStar(number) {
    return new Array(number);
  }

  public handleSuccess() {
    this.succes.emit(this.queryString);
  }

  public handleChecked(item) {
    this.star.emit(item.number);
  }
}
