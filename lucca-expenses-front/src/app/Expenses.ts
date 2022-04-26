import { Observable, Subscription } from "rxjs";

export interface Expense {
  readonly id?: string,
  purchasedOn: string,
  nature: string,
  originalAmount: {
    amount: number,
    currency: string
  },
  convertedAmount: {
    amount: number,
    currency: string,
  },
  comment: string,
  readonly createdAt?: string,
  readonly lastModifiedAt?: string,
}

