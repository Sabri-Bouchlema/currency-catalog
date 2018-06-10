import { Component, OnInit, ViewChild } from '@angular/core';
import { MatGridList, MatSnackBar, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

import { CurrenciesService } from '../../services/currencies.service';
import { Currency } from '../../models/currency.model';

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
  pageIndex = 1;
  pageSize = 10;

  constructor(
    private currenciesService: CurrenciesService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.initCurrencies();
  }

  private initCurrencies() {
    this.loading = true;
    this.currenciesService.findall(this.pageIndex, this.pageSize).subscribe(_currenciesPage => {
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
    this.pageIndex = this.paginator.pageIndex + 1;
    this.pageSize = this.paginator.pageSize;
    this.initCurrencies();
  }

}
