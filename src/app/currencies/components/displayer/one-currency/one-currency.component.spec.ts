import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OneCurrencyComponent } from './one-currency.component';

describe('OneCurrencyComponent', () => {
  let component: OneCurrencyComponent;
  let fixture: ComponentFixture<OneCurrencyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OneCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
