import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Expense } from '../Expenses';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddExpense: boolean = false;
  private subject = new Subject<any>();
  private apiUrl = 'http://localhost:3000/expenseItems'

  constructor(private http:HttpClient) { }

  /**
   * Change the value of showAddExpense to show or hide the add form
   */
  toggleAddExpense(): void {
    this.showAddExpense = !this.showAddExpense;
    this.subject.next(this.showAddExpense);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

  /**
   * To get the total number of expenses
   * @returns an observable
   */
  getExpensesAmount(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl);
  }
}
