import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { Currency } from '../models/currency.model';

import { CurrenciesPage } from '../models/currencies-page.model';

import { QueryParams } from '../models/query-params.model';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  constructor(private http: HttpClient) {}

  private getApiHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Accept' : 'application/vnd.api+json'
    });
    return headers;
  }

 private buildHttpParams(queryParams: QueryParams): HttpParams {

  if (queryParams.filterValue !== undefined && queryParams.filterValue.length > 0) {
    const filterValue = queryParams.filterValue;
    const filterKey = queryParams.filterKey === 'any' ? 'search' : queryParams.filterKey;

    return new HttpParams()
      .append('page[number]', queryParams.pageIndex.toString())
      .append('page[size]', queryParams.pageSize.toString())
      .append(`filter[${filterKey}]`, filterValue);
  }

  return new HttpParams()
      .append('page[number]', queryParams.pageIndex.toString())
      .append('page[size]', queryParams.pageSize.toString());
 }

 public findall(queryParams: QueryParams): Observable<CurrenciesPage> {

    const params: HttpParams = this.buildHttpParams(queryParams);

    const options = {
      params: params,
      headers: this.getApiHeaders()
    };

    return this.http.get(environment.apiUrl, options)
      .pipe(map((response: any) => {

        const currenciesPage = new CurrenciesPage(response);
        return currenciesPage;

      }), catchError(this.handleError)
      );
  }

  public findone(id: string): Observable<Currency> {

    const options = {
      headers: this.getApiHeaders()
    };

    return this.http.get(environment.apiUrl + '/' + id, options)
      .pipe(map((response: any) => {

        const currency = new Currency(response.data);

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
