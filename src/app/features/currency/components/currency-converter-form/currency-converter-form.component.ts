import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {CurrencyConverterFormControl} from '../../models/currency-converter-form-control.enum';
import {getControlErrorMessage} from '../../../../shared/utils/get-control-error-message';
import {tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {CurrencyService} from '../../services/currency.service';

@Component({
  selector: 'app-currency-converter-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './currency-converter-form.component.html',
  styleUrl: './currency-converter-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyConverterFormComponent implements OnInit {

  CurrencyConverterFormControl = CurrencyConverterFormControl;
  getControlErrorMessage = getControlErrorMessage;

  private fb = inject(NonNullableFormBuilder)
  private store = inject(Store)
  private currencyService = inject(CurrencyService)

  curList: { id: string, value: string }[] = [
    {id: 'one', value: 'First option'},
    {id: 'two', value: 'Second option'},
    {id: 'three', value: 'Third option'},
    {id: 'four', value: 'Fourth option'},
  ]

  currencyConverterForm = this.fb.group({
    [CurrencyConverterFormControl.currency_from]: [this.curList[0].id, [Validators.required]],
    [CurrencyConverterFormControl.currency_to]: [this.curList[1].id, [Validators.required]],
    [CurrencyConverterFormControl.amount_from]: [1, [Validators.required]],
    [CurrencyConverterFormControl.amount_to]: [1, [Validators.required]],
  });

  ngOnInit(): void {
    this.currencyConverterForm.valueChanges.subscribe(console.log);

    // this.currencyService.getStatus().subscribe()

    // this.currencyService.getLatest({
    //   base_currency: 'PLN',
    //   currencies: ['USD', 'EUR']
    // }).subscribe()
    // this.currencyService.getCurrencies(['USD', 'EUR']).subscribe()

    // this.store.select((state) => state.auth.isAuthenticated)
    //   .pipe(
    //     tap(isAuthenticated => {
    //       console.log('isAuthenticated', isAuthenticated)
    //     })
    //   )
    //   .subscribe();
  }
}
