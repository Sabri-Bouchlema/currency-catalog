import { Component, OnInit, Input } from '@angular/core';
import { Currency } from '../../../models/currency.model';

@Component({
  selector: 'app-one-currency',
  templateUrl: './one-currency.component.html',
  styleUrls: ['./one-currency.component.css']
})
export class OneCurrencyComponent {

  @Input()
  currency: Currency;

}
