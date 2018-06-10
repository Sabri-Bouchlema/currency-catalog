import { CurrenciesModule } from './currencies.module';

describe('CurrenciesModule', () => {
  let currenciesModule: CurrenciesModule;

  beforeEach(() => {
    currenciesModule = new CurrenciesModule();
  });

  it('should create an instance', () => {
    expect(currenciesModule).toBeTruthy();
  });
});
