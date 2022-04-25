import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public totalExpenses: number;

  newTotalExpenses(amount: number): void {
    this.totalExpenses = amount;
  }

}
