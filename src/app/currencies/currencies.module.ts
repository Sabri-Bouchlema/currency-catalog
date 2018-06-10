import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  MatToolbarModule,
  MatCardModule,
  MatGridListModule,
  MatDividerModule,
  MatSnackBarModule,
  MatProgressBarModule
} from '@angular/material';

import { DisplayerComponent } from './components/displayer/displayer.component';
import { OneCurrencyComponent } from './components/displayer/one-currency/one-currency.component';

import { routes } from './currencies.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatGridListModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  declarations: [DisplayerComponent, OneCurrencyComponent]
})
export class CurrenciesModule { }
