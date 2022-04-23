import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Expense } from 'src/app/Expenses';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
  @Output() onSubmitExpense: EventEmitter<Expense> = new EventEmitter();
  nature: string;
  natureError: string = '';
  date: string;
  dateError: string = '';
  price: string;
  priceError: string = '';
  currency: string;
  currencyError: string = '';
  comment: string;


  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
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
