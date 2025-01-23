export interface CurrencyInfo {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
  type: string;
}

export interface CurrencyInfoDto {
  data: Record<string, CurrencyInfo> | null;
}

export enum CurrencyConverterFormControl {
  base_currency = 'base_currency',
  currency = 'currency',
  amount = 'amount',
  amountResult = 'amountResult',
}
