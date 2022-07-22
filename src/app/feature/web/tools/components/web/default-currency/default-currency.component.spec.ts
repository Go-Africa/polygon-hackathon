import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCurrencyComponent } from './default-currency.component';

describe('DefaultCurrencyComponent', () => {
  let component: DefaultCurrencyComponent;
  let fixture: ComponentFixture<DefaultCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultCurrencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
