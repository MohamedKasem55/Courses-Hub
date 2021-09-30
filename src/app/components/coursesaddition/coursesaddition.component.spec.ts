import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesadditionComponent } from './coursesaddition.component';

describe('CoursesadditionComponent', () => {
  let component: CoursesadditionComponent;
  let fixture: ComponentFixture<CoursesadditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesadditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesadditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
