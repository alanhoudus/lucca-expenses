import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Expense } from 'src/app/Expenses';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() totalExpenses: number;

  public expenses: Expense[] = [];
  public showAddExpense: boolean = false;
  private subscription: Subscription;
  private subscriptions: Subscription[] = [];

  constructor(private uiService:UiService) {
    const newSub = this.subscription = this.uiService
    .onToggle()
    .subscribe((value) => (this.showAddExpense = value));

    this.subscriptions.push(newSub);
  }

  ngOnInit(): void {
    const newSub = this.uiService.getExpensesAmount().subscribe((expenses: Expense[]) => (
      this.totalExpenses = expenses.length
    ))
    this.subscriptions.push(newSub);
  }

  ngOnDestroy(): void {
    // removing the subscriptions
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  // Successful submit was made
  toggleAddExpense(): void {
    // reverse showAddExpense (to close the form)
    this.uiService.toggleAddExpense();
    this.ngOnInit();
  }
}
