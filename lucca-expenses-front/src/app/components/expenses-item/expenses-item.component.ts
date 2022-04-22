import { Component, OnInit, Input } from '@angular/core';
import { Expense } from 'src/app/Expenses';

@Component({
  selector: 'app-expenses-item',
  templateUrl: './expenses-item.component.html',
  styleUrls: ['./expenses-item.component.scss']
})
export class ExpensesItemComponent implements OnInit {
  @Input() expense: Expense;

  constructor() { }

  ngOnInit(): void {
  }

}
