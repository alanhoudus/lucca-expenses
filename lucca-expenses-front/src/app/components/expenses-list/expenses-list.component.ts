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
  public currentPageNumber: number = 1;
  public maxPages: number;
  public elementsToDisplay: number = 10;
  private subscriptions: Subscription[] = [];

  public dateFilter: string = '';
  public dateError: boolean = false;
  public filter: string = '';

  public ArrowLeft = faArrowLeft;
  public ArrowRight= faArrowRight;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
  this.getCurrentPageDatas(this.currentPageNumber, this.elementsToDisplay);
  this.getAllExpenses();
  }

  ngOnDestroy(): void {
    // removing the subscriptions
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  /**
   * On submit of the form, change the number of displayed items
   */
  changePaginationFormat():void {
    this.currentPageNumber = 1;
    this.getCurrentPageDatas(this.currentPageNumber, this.elementsToDisplay);
    this.calculateMaxPages();
  }

  /**
   * Calculate the number of pages regarding the amount of total expenses and the number of elements to be displayed
   */
  calculateMaxPages():void {
    this.maxPages = Math.ceil(this.totalExpenses.length / this.elementsToDisplay);
  }

  /**
   * Reloads the first page with default data
   */
  unfilter(): void {
    this.filter = '';
    this.dateFilter = '';
    this.currentPageNumber = 1;
    this.getCurrentPageDatas(this.currentPageNumber, this.elementsToDisplay);
  }

  /**
   * Filters results on the dateFilter
   * Either returns a boolean on form error, or nothing
   */
  filterSubmit(): void | boolean {

    if (!this.dateFilter) {
      return this.dateError = true;
    }
    this.dateError = false;

    const newSub = this.expenseService.getFilteredExpensesData(this.dateFilter, this.filter, this.currentPageNumber, this.elementsToDisplay).subscribe((filteredExpenses) => {
      this.currentPageNumber = 1;
      this.currentExpensesPage = filteredExpenses;
    });

    this.subscriptions.push(newSub);
  }

  /**
   * Get the classic expenses data
   */
  getCurrentPageDatas(pageDisplayed: number, numberOfElements: number): void {
    const newSub = this.expenseService.getCurrentExpensesPageData(this.currentPageNumber, this.elementsToDisplay).subscribe((currentExpenses: Expense[]) => (
      this.currentExpensesPage = currentExpenses));

    this.subscriptions.push(newSub);
  }

  /**
   * Get all the datas to get the length of the collection
   * And calculate the number of pages
   */
  getAllExpenses(): void {
    const newSub = this.expenseService.getTotalExpensesData().subscribe((totalExpenses: Expense[]) => {
      this.totalExpenses = totalExpenses;
      this.calculateMaxPages();
    });

    this.subscriptions.push(newSub);
  }
  /**
   * Decrements the currentPageNumber to display a new page
   */
  lowerExpensePage(): void {
    if (this.currentPageNumber !== 1) {
      this.currentPageNumber--;
      this.getCurrentPageDatas(this.currentPageNumber, this.elementsToDisplay)
    }
  }

  /**
   * Increments the currentPageNumber to display a new page
   */
  higherExpensePage() {
    if (this.maxPages !== this.currentPageNumber) {
      this.currentPageNumber++;
    this.getCurrentPageDatas(this.currentPageNumber, this.elementsToDisplay)
    }

  }

  /**
   * Removes an item and filters it out from the DOM
   * Also removes it from the total expenses array and emit the new amount
   * @param expense the item to delete
   */
  deleteExpense(expense: Expense): void {
    const newSub = this.expenseService
    .deleteExpenseItem(expense)
    .subscribe(() => {
      this.currentExpensesPage = this.currentExpensesPage.filter(exp => exp.id !== expense.id);
      this.expensesListModified.emit(this.totalExpenses.length);
      this.getAllExpenses();
    });
    this.subscriptions.push(newSub);
  }

  /**
   * When adding an expense
   * Emit the new amount of expenses
   * Pushes it on both arrays, and gets the new data
   * @param expense the item to add
   */
  addExpense(expense: Expense): void {
    const newSub = this.expenseService.postExpenseItem(expense).subscribe((expense: Expense) => {
      this.currentExpensesPage.unshift(expense);
      this.expensesListModified.emit(this.totalExpenses.length);
      this.getAllExpenses();
    })
    this.subscriptions.push(newSub);
  }

  /**
   * Edits an item
   * And reloads the data
   * @param editedExpense the item to edit
   */
  putExpense(editedExpense: Expense): void {
    const newSub = this.expenseService.putExpenseItem(editedExpense).subscribe(() => {
      this.ngOnInit();
    });
    this.subscriptions.push(newSub);
  }

}
