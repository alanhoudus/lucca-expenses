import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public totalExpenses: number;

  /**
   * @param amount the total amount of expenses
   */
  newTotalExpenses(amount: number): void {
    this.totalExpenses = amount;
  }

}
