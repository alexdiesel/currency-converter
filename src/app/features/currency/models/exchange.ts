export interface ExchangeRates {
  [currencyCode: string]: number;
}

export interface ExchangeRatesDto {
  data: ExchangeRates;
}

export interface ExchangeHistory {
  id?: number;
  date: string;
  baseCurrency: string;
  baseAmount: number;
  targetCurrency: string;
  exchangeResult: number;
}
