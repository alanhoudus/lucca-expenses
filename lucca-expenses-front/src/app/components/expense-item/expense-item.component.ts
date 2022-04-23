import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// interface
import { Expense } from 'src/app/Expenses';
// icons
import { faTimes, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.scss']
})
export class ExpenseItemComponent implements OnInit {
  @Input() expense: Expense;
  @Output() expenseToDelete: EventEmitter<Expense> = new EventEmitter()
  faTimes = faTimes;
  faPenToSquare = faPenToSquare;


  constructor() { }

  ngOnInit(): void {
  }

  onDeleteExpense(expense: Expense) {
    this.expenseToDelete.emit(expense)
  }
}
