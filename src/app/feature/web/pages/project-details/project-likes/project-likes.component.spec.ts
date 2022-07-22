import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLikesComponent } from './project-likes.component';

describe('ProjectLikesComponent', () => {
  let component: ProjectLikesComponent;
  let fixture: ComponentFixture<ProjectLikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectLikesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
