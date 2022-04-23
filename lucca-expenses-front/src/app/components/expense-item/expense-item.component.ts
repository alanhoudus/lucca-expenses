import { Component, OnInit, Input } from '@angular/core';
// mockdata
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
  faTimes = faTimes;
  faPenToSquare = faPenToSquare;


  constructor() { }

  ngOnInit(): void {
  }

}
