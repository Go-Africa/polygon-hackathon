import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallInvestComponent } from './call-invest.component';

describe('CallInvestComponent', () => {
  let component: CallInvestComponent;
  let fixture: ComponentFixture<CallInvestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallInvestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallInvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
