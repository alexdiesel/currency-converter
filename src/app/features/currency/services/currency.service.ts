import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay } from 'rxjs';
import { API_CURRENCIES_URL } from '../consts/currencies-url.const';
import { FREECURRENCY_API_KEY as apikey } from '../../../../env';
import { catchError, map } from 'rxjs/operators';
import { CurrencyInfoDto } from '../models/currency';
import { ExchangeRates, ExchangeRatesDto } from '../models/exchange';

export class CurrencyService {
  private http = inject(HttpClient);
  private currencies$: Observable<CurrencyInfoDto['data']> | null = null;

  getCurrencies(): Observable<CurrencyInfoDto['data']> {
    if (!this.currencies$) {
      this.currencies$ = this.http
        .get<CurrencyInfoDto>(`${API_CURRENCIES_URL}/currencies`, { params: { apikey } })
        .pipe(
          catchError((error) => {
            console.error('error', error);
            return of({ data: null });
          }),
          map(({ data }) => data),
          shareReplay(1),
        );
    }
    return this.currencies$;
  }

  getLatest({
    base_currency,
    currencies,
  }: {
    base_currency?: string | null;
    currencies?: string[] | null;
  } = {}): Observable<ExchangeRates> {
    const params = {
      apikey,
      ...(base_currency && { base_currency }),
      ...(currencies && { currencies: currencies.join(',') }),
    };
    return this.http.get<ExchangeRatesDto>(`${API_CURRENCIES_URL}/latest`, { params }).pipe(map(({ data }) => data));
  }
}
