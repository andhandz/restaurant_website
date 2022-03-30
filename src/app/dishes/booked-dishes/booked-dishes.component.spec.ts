import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedDishesComponent } from './booked-dishes.component';

describe('BookedDishesComponent', () => {
  let component: BookedDishesComponent;
  let fixture: ComponentFixture<BookedDishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedDishesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
