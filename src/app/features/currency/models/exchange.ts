export interface ExchangeRates {
  [currencyCode: string]: number;
}

export interface ExchangeRatesDto {
  data: ExchangeRates;
}

export interface ExchangeHistory {
  id?: number;
  date: Date | string;
  baseCurrency: string;
  baseAmount: number | string;
  targetCurrency: string;
  exchangeResult: number | string;
}

export class ExchangeHistoryModel implements ExchangeHistory {
  id?: number;
  date: string;
  baseCurrency: string;
  baseAmount: string;
  targetCurrency: string;
  exchangeResult: string;

  constructor({id, date, baseCurrency, baseAmount, targetCurrency, exchangeResult}: ExchangeHistory) {
    this.id = id;
    this.date = date.toString();
    this.baseCurrency = baseCurrency;
    this.baseAmount = baseAmount.toLocaleString();
    this.targetCurrency = targetCurrency;
    this.exchangeResult = (+(+exchangeResult).toFixed(3)).toLocaleString()
  }
}
