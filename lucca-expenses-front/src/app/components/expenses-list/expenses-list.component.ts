import { Component, OnInit } from '@angular/core';
import { EXPENSES } from 'src/app/mock-data';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {
  expenses = EXPENSES;

  constructor() { }

  ngOnInit(): void {
  }

}
