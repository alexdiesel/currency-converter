import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {CurrencyConverterFormComponent} from './components/currency-converter-form/currency-converter-form.component';
import {CurrencyService} from './services/currency.service';
import {HistoryService} from './services/history.service';
import {
  CurrencyConverterHistoryComponent
} from './components/currency-converter-history/currency-converter-history.component';

@Component({
  selector: 'app-currency-converter',
  imports: [
    CurrencyConverterFormComponent,
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
export class CurrencyConverterComponent {

  showForm = signal(true);
  toggleForm = () => this.showForm.update((value) => !value);

}
