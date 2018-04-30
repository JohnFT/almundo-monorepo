import { Component, OnInit, Input } from '@angular/core';
import { GetConfigService } from '../..';
import { Amenitie } from '../../interfaces/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() name: string;
  @Input() price: string;
  @Input() amenities: Amenitie[];
  @Input() image: string;
  public lsStars: number[];
  private _stars: number;
  @Input()
  get stars() {
    return this._stars;
  }

  set stars(stars) {
    this._stars = stars;
    this.lsStars = new Array(stars);
  }

  public urlStatics: string;
  constructor(private config: GetConfigService) {
    this.urlStatics = config.routes.urlStatics;
  }

  ngOnInit() {
  }
  public getStar(number) {
    return new Array(number);
  }

}
