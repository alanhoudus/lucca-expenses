import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  public currentOriginalPriceEdit: number = parseInt('');
  public currentOriginalCurrencyEdit: string = '';
  public currentCommentEdit: string = '';
  private currentExpenseId: string | undefined;
  private currentConvertedPriceEdit: number;
  private currentConvertedCurrencyEdit: string = 'EUR';


  public natureError: boolean = false;
  public dateError: boolean = false;
  public priceError: boolean = false;
  public currencyError: boolean = false;


  public faTimes = faTimes;
  public faPenToSquare = faPenToSquare;

  public editExpense: boolean = false;


  constructor() {
  }

  ngOnInit(): void {
  }

  /**
   * When the user clicks on the edit button of an item
   * @param expense The targeted item object expense to be displayed in the inputs
   */
  getCurrentExpense(expense: Expense): void {
    this.currentNatureEdit = expense.nature;
    this.currentDateEdit = expense.purchasedOn;
    this.currentOriginalPriceEdit = expense.originalAmount.amount;
    this.currentOriginalCurrencyEdit = expense.originalAmount.currency;
    this.currentCommentEdit = expense.comment;
    this.currentExpenseId = expense.id;
  }

  /**
   * On submit of the edit expense
   * Checks for form errors
   * Emits the edited object to be put
   * Closes the form
   */
  onSubmit():void {
    // Could have also done an empty array and add errors
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
    if(!this.currentOriginalPriceEdit) {
      this.priceError = true;
    }
    else if(this.currentOriginalPriceEdit) {
      this.priceError = false;
    }
    if(!this.currentOriginalCurrencyEdit) {
      this.currencyError = true;
    }
    else if(this.currentOriginalCurrencyEdit) {
      this.currencyError = false;

      if (this.currentOriginalCurrencyEdit === 'USD') {
        this.currentConvertedPriceEdit = this.currentOriginalPriceEdit * 0.93;
      }
      else if(this.currentOriginalCurrencyEdit === 'GBP') {
        this.currentConvertedPriceEdit = this.currentOriginalPriceEdit * 1.19;
      }
      else {
        this.currentConvertedPriceEdit = this.currentOriginalPriceEdit;
      }
    }
    if (this.currentNatureEdit && this.currentDateEdit && this.currentOriginalPriceEdit && this.currentOriginalCurrencyEdit ) {

      const editedExpense = {
        id: this.currentExpenseId,
        nature: this.currentNatureEdit,
        purchasedOn: this.currentDateEdit,
        originalAmount: {
          amount: parseFloat(this.currentOriginalPriceEdit.toFixed(2)),
          currency: this.currentOriginalCurrencyEdit,
        },
        convertedAmount: {
          amount: parseFloat(this.currentConvertedPriceEdit.toFixed(2)),
          currency: this.currentConvertedCurrencyEdit
        },
        comment: this.currentCommentEdit
      }
      this.toggleEditForm();
      this.onSubmitEdit.emit(editedExpense);
    }


  }

  /**
   * Inverse the value of editExpense to open or close the edit form
   */
  toggleEditForm(): void {
    this.editExpense = !this.editExpense;
  }

    /**
   * Emit the object to be deleted
   * @param expense object to be deleted
   */
  onDeleteExpense(expense: Expense) {
    this.expenseToDelete.emit(expense)
  }
}
