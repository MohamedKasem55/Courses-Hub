import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryadditionComponent } from './categoryaddition.component';

describe('CategoryadditionComponent', () => {
  let component: CategoryadditionComponent;
  let fixture: ComponentFixture<CategoryadditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryadditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryadditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
