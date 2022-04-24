import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public expensesAmount: number;

  getExpensesAmount(amount: number): void {
    this.expensesAmount = amount;
  }

  title = 'lucca-expenses-front';


}
