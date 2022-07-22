import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileeComponent } from './user-profile.component';

describe('UserProfileeComponent', () => {
  let component: UserProfileeComponent;
  let fixture: ComponentFixture<UserProfileeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
