export interface ExchangeHistory {
  id?: number;
  date: string;
  baseCurrency: string;
  baseAmount: number;
  targetCurrency: string;
  exchangeResult: number;
}
