import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Expense } from 'src/app/Expenses';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'http://localhost:3000/expenseItems'

  constructor(private http:HttpClient) { }

  getExpensesData(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl)
  }

  deleteExpenseItem(expense: Expense): Observable<Expense> {
    const url = `${this.apiUrl}/${expense.id}`;
    return this.http.delete<Expense>(url);
  }

  postExpenseItem(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense, httpOptions);
  }
}
