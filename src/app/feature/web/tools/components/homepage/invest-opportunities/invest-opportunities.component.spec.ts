import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestOpportunitiesComponent } from './invest-opportunities.component';

describe('InvestOpportunitiesComponent', () => {
  let component: InvestOpportunitiesComponent;
  let fixture: ComponentFixture<InvestOpportunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestOpportunitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
