import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import { Expense } from 'src/app/Expenses';
import { Subscription } from 'rxjs';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit, OnDestroy {
  @Output() expensesListModified: EventEmitter<number> = new EventEmitter();

  public currentExpensesPage: Expense[] = [];
  public totalExpenses: Expense[] = [];
  private subscriptions: Subscription[] = [];
  public currentPageNumber: number = 1;

  public ArrowLeft = faArrowLeft;
  public ArrowRight= faArrowRight;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.getCurrentExpensesPageData(this.currentPageNumber).subscribe((currentExpenses: Expense[]) => (
      this.currentExpensesPage = currentExpenses));

    this.expenseService.getTotalExpensesData().subscribe((totalExpenses: Expense[]) => (
      this.totalExpenses = totalExpenses));
  }

  ngOnDestroy(): void {
    // removing the subscriptions
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  /**
   * Decrements the currentPageNumber to display a new page
   */
  lowerExpensePage() {
    if (this.currentPageNumber !== 1) {
      this.currentPageNumber--;
      this.ngOnInit();
    }
  }

  /**
   * Increments the currentPageNumber to display a new page
   */
  higherExpensePage() {
    this.currentPageNumber++;
    this.ngOnInit();
  }

  /**
   * Removes an item and filters it out from the DOM
   * @param expense the item to delete
   */
  deleteExpense(expense: Expense): void {
    const newSub = this.expenseService
    .deleteExpenseItem(expense)
    .subscribe(() => (
      this.currentExpensesPage = this.currentExpensesPage.filter(exp => exp.id !== expense.id)
    ));
    this.subscriptions.push(newSub);
  }

  /**
   * When adding an expense
   * @param expense the item to add
   */
  addExpense(expense: Expense): void {
    console.log(this.totalExpenses);
    const newSub = this.expenseService.postExpenseItem(expense).subscribe((expense: Expense) => {
      this.totalExpenses.push(expense);
      this.expensesListModified.emit(this.totalExpenses.length);
    })
    this.subscriptions.push(newSub);
    console.log(this.totalExpenses);
  }

  /**
   * Edit an item
   * @param editedExpense the item to edit
   */
  putExpense(editedExpense: Expense): void {
    const newSub = this.expenseService.putExpenseItem(editedExpense).subscribe();
    this.subscriptions.push(newSub);
    // To view the modifications
    this.ngOnInit();
  }

}
