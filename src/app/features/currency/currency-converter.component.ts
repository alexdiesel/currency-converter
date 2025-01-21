import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CurrencyConverterFormComponent} from './components/currency-converter-form/currency-converter-form.component';
import {CurrencyService} from './services/currency.service';

@Component({
  selector: 'app-currency-converter',
  imports: [
    CurrencyConverterFormComponent
  ],
  providers: [
    CurrencyService
  ],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyConverterComponent {

}
