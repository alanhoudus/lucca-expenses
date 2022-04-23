import { Injectable } from '@angular/core';
import { Expense } from 'src/app/Expenses';
import { EXPENSES } from 'src/app/mock-data';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor() { }

  getExpensesData(): Expense[] {
    return EXPENSES;
  }
}
