import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injector,
  runInInjectionContext,
  signal,
  ViewChild
} from '@angular/core';
import {CurrencyConverterFormComponent} from './components/currency-converter-form/currency-converter-form.component';
import {CurrencyService} from './services/currency.service';
import {NgIf} from '@angular/common';
import {HistoryService} from './services/history.service';
import {
  CurrencyConverterHistoryComponent
} from './components/currency-converter-history/currency-converter-history.component';

@Component({
  selector: 'app-currency-converter',
  imports: [
    CurrencyConverterFormComponent,
    NgIf,
    CurrencyConverterHistoryComponent,
  ],
  providers: [
    CurrencyService,
    HistoryService,
  ],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyConverterComponent implements AfterViewInit {

  private injector = inject(Injector)

  @ViewChild('currencyConverter') currencyConverter!: CurrencyConverterFormComponent;

  showForm = signal(true);
  toggleForm = () => this.showForm.update((value) => !value);

  ngAfterViewInit(): void {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        const result = this.currencyConverter.exchangeResult();
      });
    });

  }

}
