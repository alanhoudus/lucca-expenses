import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import { Expense } from 'src/app/Expenses';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit, OnDestroy {
  expenses: Expense[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.expenseService.getExpensesData().subscribe((expenses) => (
      this.expenses = expenses
    ));
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  deleteExpense(expense: Expense) {
    const sub = this.expenseService.deleteExpenseItem(expense).subscribe(() => (
      this.expenses = this.expenses.filter(exp => exp.id !== expense.id)
    ));
    this.subscriptions.push(sub);
  }

  addExpense(expense: Expense) {
    // this.expenseService.postExpenseItem(expense).subscribe(this.expenses.push(expense))
    const sub = this.expenseService.postExpenseItem(expense).subscribe((expense: Expense) => {
      console.log(expense);
    })
    this.subscriptions.push(sub);
  }

}
