import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Expense } from 'src/app/Expenses';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit, OnDestroy {
  @Output() onSubmitExpense: EventEmitter<Expense> = new EventEmitter();

  public nature: string;
  public natureError: string = '';
  public date: string;
  public dateError: string = '';
  public originalPrice: number;
  public priceError: string = '';
  public originalCurrency: string;
  public currencyError: string = '';
  public comment: string;
  public showAddExpense: boolean;
  private convertedPrice: number;
  private convertedCurrency: string = 'EUR';

  private subscription: Subscription;
  private subscriptions: Subscription[] = [];


  constructor(private uiService: UiService) {
    const newSub = this.subscription = this.uiService
    .onToggle()
    .subscribe((value) => (this.showAddExpense = value));

    this.subscriptions.push(newSub);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // For each subscription, remove the subscription onDestroy of component
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
  /**
   * On submit of the form to add a new expense
   * Checks if there are form errors
   * Else, emit the new expense object, resets and closes the form
   */
  onSubmit(): void {
    // Could have also done an empty array and add errors
    if (!this.nature) {
      this.natureError = 'Please, add a nature for the expense'
    }
    else if(this.nature) {
      this.natureError = '';
    }
    if (!this.date) {
      this.dateError = 'Please, add a date for the expense'
    }
    else if (this.date) {
      this.dateError = '';
    }
    if (!this.originalPrice) {
      this.priceError = 'Please, add a price for the expense'
    }
    else if (this.originalPrice) {
      this.priceError = '';
    }
    if (!this.originalCurrency) {
      this.currencyError = 'Please, select a currency for the expense'
    }
    else if (this.originalCurrency) {
      this.currencyError = '';

      if (this.originalCurrency === 'USD') {
        this.convertedPrice = this.originalPrice * 0.93;
      }
      else if(this.originalCurrency === 'GBP') {
        this.convertedPrice = this.originalPrice * 1.19;
      }
      else {
        this.convertedPrice = this.originalPrice;
      }
    }
    if (this.nature && this.date && this.originalPrice && this.originalCurrency) {
      const newExpense = {
        nature: this.nature,
        purchasedOn: this.date,
        originalAmount: {
          amount: parseFloat(this.originalPrice.toFixed(2)),
          currency: this.originalCurrency
        },
        convertedAmount: {
          amount: parseFloat(this.convertedPrice.toFixed(2)),
          currency: this.convertedCurrency
        },
        comment: this.comment
      }

      this.onSubmitExpense.emit(newExpense);

      this.nature = '';
      this.date = '';
      this.originalPrice = parseInt('');
      this.comment = '';
      this.originalCurrency = 'Select a currency';

      this.uiService.toggleAddExpense();
    }
  }
}
