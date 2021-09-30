import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptCoursesComponent } from './accept-courses.component';

describe('AcceptCoursesComponent', () => {
  let component: AcceptCoursesComponent;
  let fixture: ComponentFixture<AcceptCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
