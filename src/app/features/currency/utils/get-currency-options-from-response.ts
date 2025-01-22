import {IdNameOption} from '../../../shared/models/id-name-option';
import {CurrencyInfoDto} from '../models/currency';

export const getCurrencyOptionsFromResponse = (data: CurrencyInfoDto['data']): IdNameOption[] =>
  data ? Object.entries(data).map(([key, value]) => ({id: key, name: value.name})) : []
