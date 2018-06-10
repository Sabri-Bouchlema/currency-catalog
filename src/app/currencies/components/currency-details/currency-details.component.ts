import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { Currency } from '../../models/currency.model';
import { CurrenciesService } from '../../services/currencies.service';

import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.css']
})
export class CurrencyDetailsComponent implements OnInit {

  currency: Currency;
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private currenciesService: CurrenciesService) { }

  ngOnInit() {

    this.loading = true;
    this.loadCurrency();

  }

  private loadCurrency() {
    const findone = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.currenciesService.findone(params.get('id')))
    );

    findone.subscribe(_currency => {
      if (_currency !== undefined) {
        this.currency = _currency;
        this.loading = false;
      } else {
        this.moveToCurrenciesList();
      }
    });
  }

  moveToCurrenciesList() {
    this.router.navigate(['/']);
  }


}
