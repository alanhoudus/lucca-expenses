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

  /**
   * Get the expenses of the current displayed page
   * @param currentPageNumber the page number
   * @param elementsDisplayed the number of elements to be displayed per page
   * @returns an observable
   */
  getCurrentExpensesPageData(currentPageNumber: number, elementsDisplayed: number): Observable<Expense[]> {
    const url = `${this.apiUrl}/?_page=${currentPageNumber}&_limit=${elementsDisplayed}`;
    return this.http.get<Expense[]>(url);
  }

  /**
   * Get the totaly of the expenses
   * @returns an observable
   */
  getTotalExpensesData(): Observable<Expense[]> {
    // Could have use X-Total-Count in getCurrentExpensesPageData, but wasn't sure how to pass the data in getCurrentExpensesPageData()
    return this.http.get<Expense[]>(this.apiUrl);
  }

  /**
   *
   * @param date the date to filter on
   * @param filter the type of filter
   * @param currentPageNumber the page to be displayed
   * @param elementsDisplayed the number of elements to display
   * @returns an observable
   */
  getFilteredExpensesData(date: string, filter: string, currentPageNumber: number, elementsDisplayed: number): Observable<Expense[]> {
    const url = `${this.apiUrl}/?${filter}=since,${date}/?_page=${currentPageNumber}&_limit=${elementsDisplayed}`
    return this.http.get<Expense[]>(url);
  }

  /**
   * Delete the item
   * @param expense the object to delete
   * @returns an observable
   */
  deleteExpenseItem(expense: Expense): Observable<Expense> {
    const url = `${this.apiUrl}/${expense.id}`;
    return this.http.delete<Expense>(url);
  }

  /**
   * Add a new expense
   * @param expense the object that was added
   * @returns an observable
   */
  postExpenseItem(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense, httpOptions);
  }

  /**
   * Edit an item
   * @param editedExpense the object that was edited
   * @returns an observable
   */
  putExpenseItem(editedExpense: Expense): Observable<Expense> {
    const url = `${this.apiUrl}/${editedExpense.id}`;
    return this.http.put<Expense>(url, editedExpense, httpOptions);
  }
}
