import { Component, OnInit, Input } from '@angular/core';
import { Expense } from 'src/app/Expenses';

@Component({
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.scss']
})
export class ExpenseItemComponent implements OnInit {
  @Input() expense: Expense;

  constructor() { }

  ngOnInit(): void {
  }

}
