import {ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, signal,} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {CurrencyConverterFormControl} from '../../models/currency-converter-form-control.enum';
import {getControlErrorMessage} from '../../../../shared/utils/get-control-error-message';
import {CurrencyService} from '../../services/currency.service';
import {getCurrencyOptionsFromResponse} from '../../utils/get-currency-options-from-response';
import {IdNameOption} from '../../../../shared/models/id-name-option';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {BASE_CURRENCY} from '../../consts/base-currency.const';
import {INIT_CURRENCY} from '../../consts/init-currency.const';
import {ExchangeRates} from '../../models/exchange-rates.interface';
import {debounceTime} from 'rxjs';
import {HistoryService} from '../../services/history.service';

@Component({
  selector: 'app-currency-converter-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf],
  templateUrl: './currency-converter-form.component.html',
  styleUrl: './currency-converter-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyConverterFormComponent {

  CurrencyConverterFormControl = CurrencyConverterFormControl;
  getControlErrorMessage = getControlErrorMessage;

  currencyOptions = signal<IdNameOption[]>([]);
  baseCurrency = signal<string>(BASE_CURRENCY);
  targetCurrency = signal<string>(INIT_CURRENCY);
  exchangeRates = signal<ExchangeRates>({});
  baseAmount = signal<number>(1);
  exchangeResult = computed(() => {
    const rate = this.exchangeRates()[this.targetCurrency()];
    const amount = this.baseAmount();
    return +(rate * amount).toFixed(4);
  });

  private destroyRef = inject(DestroyRef);
  private fb = inject(NonNullableFormBuilder);
  private currencyService = inject(CurrencyService);
  private historyService = inject(HistoryService);

  currencyConverterForm = this.fb.group({
    [CurrencyConverterFormControl.base_currency]: [BASE_CURRENCY, [Validators.required]],
    [CurrencyConverterFormControl.currency]: [INIT_CURRENCY, [Validators.required]],
    [CurrencyConverterFormControl.amount]: [1, [Validators.required]],
    [CurrencyConverterFormControl.amountResult]: [{value: 1, disabled: true}, [Validators.required]],
  });

  constructor() {
    this.loadCurrencies();
    this.syncExchangeRates();
    this.syncFormWithSignals();
    this.syncAmountResult();
  }

  private loadCurrencies() {
    this.currencyService
      .getCurrencies()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((currencies) => {
        this.currencyOptions.set(getCurrencyOptionsFromResponse(currencies));
      });
  }

  private syncExchangeRates() {
    effect(() => {
      const base = this.baseCurrency();
      const target = this.targetCurrency();

      this.currencyService
        .getLatest({base_currency: base, currencies: [target]})
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((rates) => {
          this.exchangeRates.set(rates);

          this.currencyConverterForm
            .get(CurrencyConverterFormControl.amountResult)
            ?.setValue(this.exchangeResult(), {emitEvent: false});
        });
    });
  }

  private syncFormWithSignals() {
    this.currencyConverterForm.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(200)
      )
      .subscribe(({base_currency, currency, amount}) => {
        this.baseAmount.set(amount!);
        this.baseCurrency.set(base_currency!);
        this.targetCurrency.set(currency!);
      });
  }

  private syncAmountResult() {
    effect(() => {
      this.currencyConverterForm
        .get(CurrencyConverterFormControl.amountResult)
        ?.setValue(this.exchangeResult(), {emitEvent: false});
    });
  }

  saveToHistory(): void {
    this.historyService.setExchangeHistory({
      id: this.historyService.getExchangeHistoryLastIndex() + 1,
      date: new Date().toISOString(),
      baseCurrency: this.baseCurrency(),
      baseAmount: this.baseAmount(),
      targetCurrency: this.targetCurrency(),
      exchangeResult: this.exchangeResult(),
    })
  }
}
