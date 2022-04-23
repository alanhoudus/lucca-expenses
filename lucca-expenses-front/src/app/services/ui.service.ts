import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddExpense: boolean = false;
  private subject = new Subject<any>();

  constructor() { }

  toggleAddTask(): void {
    this.showAddExpense = !this.showAddExpense;
    this.subject.next(this.showAddExpense);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
