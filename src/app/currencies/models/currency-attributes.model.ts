export class CurrencyAttributes {

    code: string;
    name: string;
    currencyType: string;
    codeIsoNumeric3: string;
    codeIsoAlpha3: string;
    symbol: string;
    nativeSymbol: string;
    category: string;
    exponent: number;
    constructor(json: any) {

        if (json !== undefined) {
            this.code = json.code;
            this.name = json.name;
            this.currencyType = json.currency_type;
            this.codeIsoNumeric3 = json.code_iso_numeric3;
            this.codeIsoAlpha3 = json.code_iso_alpha3;
            this.symbol = json.symbol;
            this.nativeSymbol = json.native_symbol;
            this.category = json.category;
            this.exponent = json.exponent;
        }
    }
}
