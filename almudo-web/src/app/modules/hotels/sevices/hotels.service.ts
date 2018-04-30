import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hotel } from '../interfaces/hotels';
import { GetConfigService } from '../../../shared';

@Injectable()
export class HotelsService {

  private url: string;

  constructor(private http: HttpClient, private config: GetConfigService) {
    this.url = config.routes.urlServices;
  }

  public async findHotels() {
    const res = await this.http.get<Hotel>(this.url + 'hotels').toPromise();
    return res;
  }
}
