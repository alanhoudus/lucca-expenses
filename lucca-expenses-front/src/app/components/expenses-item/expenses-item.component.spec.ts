import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesItemComponent } from './expenses-item.component';

describe('ExpensesItemComponent', () => {
  let component: ExpensesItemComponent;
  let fixture: ComponentFixture<ExpensesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
