import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: './currencies/currencies.module#CurrenciesModule',
    }
];

