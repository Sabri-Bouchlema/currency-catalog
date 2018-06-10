import { Routes } from '@angular/router';

import { DisplayerComponent } from './components/displayer/displayer.component';
import { CurrencyDetailsComponent } from './components/currency-details/currency-details.component';

export const routes: Routes = [
    {
        path: 'currency/:id',
        component: CurrencyDetailsComponent
    },
    {
        path: '',
        component: DisplayerComponent
    }
];

