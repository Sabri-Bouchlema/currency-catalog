import { Component, OnInit, ViewChild } from '@angular/core';
import { MatGridList, MatSnackBar } from '@angular/material';

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

  constructor(
    private currenciesService: CurrenciesService,
    private snackbar: MatSnackBar) {

  }

  ngOnInit() {
    this.loading = true;
    this.initCurrencies();
  }

  private initCurrencies() {
    this.currenciesService.findall().subscribe(_currencies => {
      this.currencies = _currencies;
      this.loading = false;
    }, error => {
      this.snackbar.open(error, 'close', { duration : 2000, });
    });
  }

}
