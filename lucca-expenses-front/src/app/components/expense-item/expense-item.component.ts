import { Component, OnInit, Input, Output, EventEmitter, Inject, LOCALE_ID } from '@angular/core';
// interface
import { Expense } from 'src/app/Expenses';
// icons
import { faTimes, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.scss']
})
export class ExpenseItemComponent implements OnInit {
  @Input() expense: Expense;
  @Output() expenseToDelete: EventEmitter<Expense> = new EventEmitter();
  @Output() onSubmitEdit: EventEmitter<Expense> = new EventEmitter();

  public currentNatureEdit: string = '';
  public currentDateEdit: string = '';
  public currentPriceEdit: number = parseInt('');
  public currentCurrencyEdit: string = '';
  public currentCommentEdit: string = '';
  private currentExpenseId: string | undefined = '';


  public natureError: boolean = false;
  public dateError: boolean = false;
  public priceError: boolean = false;
  public currencyError: boolean = false;


  public faTimes = faTimes;
  public faPenToSquare = faPenToSquare;

  public editExpense: boolean = false;


  constructor(@Inject(LOCALE_ID) public locale: string) {
  }

  ngOnInit(): void {
  }

  getCurrentExpense(expense: Expense): void {
    this.currentNatureEdit = expense.nature;
    this.currentDateEdit = expense.purchasedOn;
    this.currentPriceEdit = expense.originalAmount.amount;
    this.currentCurrencyEdit = expense.originalAmount.currency;
    this.currentCommentEdit = expense.comment;
    this.currentExpenseId = expense.id;
  }

  // TODO Array of errors
  onSubmit():void {
    if(!this.currentNatureEdit) {
      this.natureError = true;
    }
    else if(this.currentNatureEdit) {
      this.natureError = false;
    }
    if(!this.currentDateEdit) {
      this.dateError = true;
    }
    else if(this.currentDateEdit) {
      this.dateError = false;
    }
    if(!this.currentPriceEdit) {
      this.priceError = true;
    }
    else if(this.currentPriceEdit) {
      this.priceError = false;
    }
    if(!this.currentCurrencyEdit) {
      this.currencyError = true;
    }
    else if(this.currentCurrencyEdit) {
      this.currencyError = false;
    }
    if (this.currentNatureEdit && this.currentDateEdit && this.currentPriceEdit && this.currentCurrencyEdit ) {
      this.natureError = false;
      this.dateError = false;
      this.priceError = false;
      this.currencyError = false;

      const editedExpense = {
        id: this.currentExpenseId,
        nature: this.currentNatureEdit,
        purchasedOn: this.currentDateEdit,
        originalAmount: {
          amount: this.currentPriceEdit,
          currency: this.currentCurrencyEdit,
        },
        comment: this.currentCommentEdit
      }
      this.toggleEditForm();
      this.onSubmitEdit.emit(editedExpense);
    }


  }

  toggleEditForm(): void {
    this.editExpense = !this.editExpense;
  }

  onDeleteExpense(expense: Expense) {
    this.expenseToDelete.emit(expense)
  }
}
