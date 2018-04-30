import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Config } from '../interfaces/config';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { routes, token } from '../../globals';
@Injectable()
export class GetConfigService {
  private urlConfig = 'assets/config/config.json';
  constructor(private http: HttpClient) { }

  public async setConfigInitial(): Promise<boolean> {
    try {
      const result = await this.getConfig().toPromise();
      if (result) {
        this.routes = result;
        return true;
      }
    } catch (err) {
      console.log(err);

    }
    return false;

  }

  public get routes(): Config {
    return JSON.parse(localStorage.getItem(routes));
  }
  public set routes(data: Config) {
    localStorage.setItem(routes, JSON.stringify(data));
  }
  public get token() {
    return localStorage.getItem(token);
  }
  public set token(data: string) {
    localStorage.setItem(token, data);
  }
  public getConfig(): Observable<Config> {
    return this.http.get<Config>(this.urlConfig).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  }

}
