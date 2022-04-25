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
  private apiUrl: string = 'http://localhost:3000/expenseItems'
  private currencyLayerApiUrl: string = 'http://api.currencylayer.com/live';
  private currencyLayerApiKey: string = '29b3cf153a2955f2cb132243069c65af';

  constructor(private http:HttpClient) { }

  getCurrentExpensesPageData(currentPageNumber: number): Observable<Expense[]> {
    const url = `${this.apiUrl}/?_page=${currentPageNumber}&_limit=10`;
    return this.http.get<Expense[]>(url);
  }

  // Could have use X-Total-Count in getCurrentExpensesPageData, but wasn't sure how to pass the data
  getTotalExpensesData(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl);
  }

  getFilteredExpensesData(date: string, filter: string, currentPageNumber: number): Observable<Expense[]> {
    const url = `${this.apiUrl}/?${filter}=since,${date}/?_page=${currentPageNumber}&_limit=10`
    return this.http.get<Expense[]>(url);
  }

  deleteExpenseItem(expense: Expense): Observable<Expense> {
    const url = `${this.apiUrl}/${expense.id}`;
    return this.http.delete<Expense>(url);
  }

  postExpenseItem(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense, httpOptions);
  }

  putExpenseItem(editedExpense: Expense): Observable<Expense> {
    const url = `${this.apiUrl}/${editedExpense.id}`;
    return this.http.put<Expense>(url, editedExpense, httpOptions);
  }

  getCurrencyRates() {
    const url = `${this.currencyLayerApiUrl}/${this.currencyLayerApiKey};`
  }
}
