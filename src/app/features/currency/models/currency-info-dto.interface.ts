import {CurrencyInfo} from './currency-info.interface';

export interface CurrencyInfoDto {
  data: {
    [currencyCode: string]: CurrencyInfo;
  }
}
