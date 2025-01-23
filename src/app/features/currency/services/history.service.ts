import { BehaviorSubject, Observable } from 'rxjs';
import { ExchangeHistory } from '../models/exchange';

export class HistoryService {
  private exchangeHistory$ = new BehaviorSubject<ExchangeHistory[]>([]);

  getExchangeHistory(): Observable<ExchangeHistory[]> {
    return this.exchangeHistory$.asObservable();
  }

  getExchangeHistoryLastIndex(): number {
    return this.exchangeHistory$.value.length;
  }

  setExchangeHistory(item: ExchangeHistory) {
    this.exchangeHistory$.next([...this.exchangeHistory$.value, item]);
  }

  removeExchangeHistory(id: number) {
    this.exchangeHistory$.next(this.exchangeHistory$.value.filter((item) => item.id !== id));
  }
}
