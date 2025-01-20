import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_CURRENCIES_URL} from '../../../shared/consts/api/currencies-url.const';
import {apikey} from '../../../shared/consts/api/apikey.const';
import {CurrencyInfoDto} from '../models/currency-info-dto.interface';
import {ExchangeRatesDto} from '../models/exchange-rates-dto.interface';


export class CurrencyService {

  private http = inject(HttpClient);

  getStatus(): Observable<unknown> {
    return this.http.get(`${API_CURRENCIES_URL}/status`, {params: {apikey}});
  }

  getCurrencies(currencies?: string[]): Observable<CurrencyInfoDto> {
    const params = {
      apikey,
      ...currencies && {currencies: currencies.join(',')}
    }
    return this.http.get<CurrencyInfoDto>(`${API_CURRENCIES_URL}/currencies`, {params});
  }

  getLatest({base_currency, currencies}: {
    base_currency?: string;
    currencies?: string[]
  } = {}): Observable<ExchangeRatesDto> {
    const params = {
      apikey,
      ...base_currency && {base_currency},
      ...currencies && {currencies: currencies.join(',')}
    }
    return this.http.get<ExchangeRatesDto>(`${API_CURRENCIES_URL}/latest`, {params});
  }


}
