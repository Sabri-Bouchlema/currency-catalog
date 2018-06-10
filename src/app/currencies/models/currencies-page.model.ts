import { Currency } from './currency.model';
export class CurrenciesPage {

    total: number;
    currencies: Currency[];

    constructor(json: any) {
        if (json !== undefined) {
            this.total = json.meta.total;
            this.currencies = [];
            if (json.data !== undefined) {
                json.data.forEach(_currency => {
                    const currency = new Currency(_currency);
                    this.currencies.push(currency);
                });
            }
        }
    }
}
