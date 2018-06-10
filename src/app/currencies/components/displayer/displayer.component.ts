import { Component, OnInit, ViewChild } from '@angular/core';
import { MatGridList, MatSnackBar, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

import { CurrenciesService } from '../../services/currencies.service';
import { Currency } from '../../models/currency.model';

import { QueryParams } from '../../models/query-params.model';

@Component({
  selector: 'app-displayer',
  templateUrl: './displayer.component.html',
  styleUrls: ['./displayer.component.css']
})
export class DisplayerComponent implements OnInit {

  currencies: Currency[];

  @ViewChild('grid') grid: MatGridList;

  loading: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  currenciesNumber;

  queryParams: QueryParams;

  searchOptions = [
    { label: 'Any', value: 'search'},
    { label: 'Id', value: 'id'},
    { label: 'Code', value: 'code'},
    { label: 'Name', value: 'name'},
    { label: 'Type', value: 'currency_type'}
  ];

  constructor(
    private currenciesService: CurrenciesService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.initQueryParams();
    this.initCurrencies();
  }

  private initQueryParams() {
    this.queryParams = new QueryParams();
    this.queryParams.pageIndex = 1;
    this.queryParams.pageSize = 10;
    this.queryParams.filterKey = 'any';
  }

  private initCurrencies() {
    this.loading = true;
    this.currenciesService.findall(this.queryParams).subscribe(_currenciesPage => {
      this.currencies = _currenciesPage.currencies;
      this.currenciesNumber = _currenciesPage.total;
      this.loading = false;
    }, error => {
      this.snackbar.open(error, 'close', { duration : 2000, });
    });
  }

  moveToDetails(id: string) {
    this.router.navigate(['/currency/' + id]);
  }

  pageChanged() {
    this.queryParams.pageIndex = this.paginator.pageIndex + 1;
    this.queryParams.pageSize = this.paginator.pageSize;
    this.initCurrencies();
  }

    keyChanged(value) {
    this.queryParams.filterValue = value;
    this.initCurrencies();
  }

  attributeChanged(key) {
    this.queryParams.filterKey = key;
    if (this.queryParams.filterValue !== undefined && this.queryParams.filterValue.length > 0) {
      this.initCurrencies();
    }
  }
}
