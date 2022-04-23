import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import { Expense } from 'src/app/Expenses';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {
  expenses:Expense[] = [];

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.expenseService.getExpensesData().subscribe((expenses) => (
      this.expenses = expenses
    ));
  }

  deleteExpense(expense: Expense) {
    this.expenseService.deleteExpenseItem(expense).subscribe(() => (
      this.expenses = this.expenses.filter(exp => exp.id !== expense.id)
    ));
  }

}
