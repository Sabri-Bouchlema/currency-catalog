import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { CurrenciesService } from '../../services/currencies.service';
import { Currency } from '../../models/currency.model';

import { QueryParams } from '../../models/query-params.model';

import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { LastSearchService } from '../../services/last-search.service';

@Component({
  selector: 'app-displayer',
  templateUrl: './displayer.component.html',
  styleUrls: ['./displayer.component.css']
})
export class DisplayerComponent implements OnInit, AfterContentInit {

  currencies: Currency[];

  @ViewChild('grid', { static: true }) grid: MatGridList;

  gridByBreakpoint = {
    xl: 6,
    lg: 6,
    md: 4,
    sm: 2,
    xs: 2
  };

  loading: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  currenciesNumber;

  queryParams: QueryParams;

  searchOptions = [
    { label: 'Any', value: 'search' },
    { label: 'Id', value: 'id' },
    { label: 'Code', value: 'code' },
    { label: 'Name', value: 'name' },
    { label: 'Type', value: 'currency_type' }
  ];

  constructor(
    private currenciesService: CurrenciesService,
    private snackbar: MatSnackBar,
    private router: Router,
    private observableMedia: MediaObserver,
    private lastSearchService: LastSearchService
  ) {

  }

  ngOnInit() {
    this.initQueryParams();
  }

  ngAfterContentInit() {
    this.observableMedia.asObservable().subscribe((change: MediaChange[]) => {
      this.grid.cols = this.gridByBreakpoint[change[0].mqAlias];
    });
  }

  private initQueryParams() {

    if (this.lastSearchService.params === undefined) {
      this.queryParams = new QueryParams();
      this.queryParams.pageIndex = 1;
      this.queryParams.pageSize = 10;
      this.queryParams.filterKey = 'any';

    } else {
      this.queryParams = this.lastSearchService.params;
    }
    this.initCurrencies();
  }

  private initCurrencies() {
    this.loading = true;
    this.currenciesService.findall(this.queryParams).subscribe(_currenciesPage => {
      this.currencies = _currenciesPage.currencies;
      this.currenciesNumber = _currenciesPage.total;
      this.loading = false;
    }, error => {
      this.snackbar.open(error, 'close', { duration: 2000, });
    });
  }

  moveToDetails(id: string) {
    this.lastSearchService.params = this.queryParams;
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
