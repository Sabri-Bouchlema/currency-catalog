import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Currency } from '../models/currency.model';
import { Observable, throwError } from 'rxjs';
import { Component, Input } from '@angular/core';

import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  constructor(private http: HttpClient) {
  }

  public findall(): Observable<Currency[]> {
    return this.http.get(environment.currenciesJsonFileUrl)
      .pipe(map((res: any[]) => {

        const currencies: Currency[] = [];
        res.forEach(jsonItem => {
          currencies.push(new Currency(jsonItem));
        });

        return currencies;
      }), catchError(this.handleError)
      );
  }

   public findone(id: string): Observable<Currency> {
    return this.findall()
      .pipe(map((_currencies: Currency[]) => {

        const currency = _currencies.find(function(_currency: Currency) {
          return _currency.id === id;
        });

        return currency;
      }), catchError(this.handleError)
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

    return throwError(
      'Something bad happened; please try again later.');
  }

}
