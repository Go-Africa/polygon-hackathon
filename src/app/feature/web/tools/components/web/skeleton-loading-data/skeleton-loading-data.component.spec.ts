import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonLoadingDataComponent } from './skeleton-loading-data.component';

describe('SkeletonLoadingDataComponent', () => {
  let component: SkeletonLoadingDataComponent;
  let fixture: ComponentFixture<SkeletonLoadingDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonLoadingDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonLoadingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
