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
  public price: string;
  public priceError: string = '';
  public currency: string;
  public currencyError: string = '';
  public comment: string;
  public showAddExpense: boolean;
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
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  onSubmit(): void {
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
    if (!this.price) {
      this.priceError = 'Please, add a price for the expense'
    }
    else if (this.price) {
      this.priceError = '';
    }
    if (!this.currency) {
      this.currencyError = 'Please, select a currency for the expense'
    }
    else if (this.currency) {
      this.currencyError = '';
    }
    if (this.nature && this.date && this.price && this.currency) {
      const newExpense = {
        nature: this.nature,
        purchasedOn: this.date,
        originalAmount: {
          amount: parseInt(this.price),
          currency: this.currency
        },
        comment: this.comment
      }

      this.onSubmitExpense.emit(newExpense);

      this.nature = '';
      this.date = '';
      this.price = '';
      this.comment = '';
    }
  }
}
