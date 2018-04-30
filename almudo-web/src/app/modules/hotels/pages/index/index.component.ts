import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../../sevices/hotels.service';
import { Hotel } from '../../interfaces/hotels';

@Component({
  selector: 'app-index-hotel',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public hotels: Hotel;
  public query: string;
  public stars: number;
  constructor(private service: HotelsService) { }

  ngOnInit() {
    this.getHotels();
  }

  private async getHotels() {
    try {
      this.hotels = await this.service.findHotels();
      console.log(this.hotels);
    } catch (err) {
      console.log(err);
    }
  }

  public handleSucces(txt) {
    this.query = txt;
  }

  public handleStar(number) {
    this.stars = number ? number : undefined;
  }
}
