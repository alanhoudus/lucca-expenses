import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import { Expense } from 'src/app/Expenses';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit, OnDestroy {
  @Output() shareExpensesAmountToParent: EventEmitter<number> = new EventEmitter();

  public expenses: Expense[] = [];
  private subscriptions: Subscription[] = [];
  public expensesAmount: any;

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.expenseService.getExpensesData().subscribe((expenses) => {
      this.expenses = expenses;
      this.shareExpensesAmountToParent.emit(expenses.length);
  });
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  deleteExpense(expense: Expense): void {
    const newSub = this.expenseService
    .deleteExpenseItem(expense)
    .subscribe(() => (
      this.expenses = this.expenses.filter(exp => exp.id !== expense.id)
    ));
    this.subscriptions.push(newSub);
  }

  addExpense(expense: Expense): void {
    const newSub = this.expenseService
    .postExpenseItem(expense)
    .subscribe((expense: Expense) => {
      this.expenses.push(expense);
    })
    this.subscriptions.push(newSub);
  }

  putExpense(editedExpense: Expense): void {
    const newSub = this.expenseService
    .putExpenseItem(editedExpense)
    .subscribe();
    this.subscriptions.push(newSub);
    this.ngOnInit();
  }

}
