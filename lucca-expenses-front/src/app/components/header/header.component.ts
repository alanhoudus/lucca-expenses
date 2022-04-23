import { Component, OnDestroy, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public showAddExpense: boolean = false;
  private subscription: Subscription;
  private subscriptions: Subscription[] = [];

  constructor(private uiService:UiService) {
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

  toggleAddExpense(): void {
    this.uiService.toggleAddExpense()
  }
}
