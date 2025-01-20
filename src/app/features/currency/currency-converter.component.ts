import { Component } from '@angular/core';
import {CurrencyConverterFormComponent} from './components/currency-converter-form/currency-converter-form.component';

@Component({
  selector: 'app-currency-converter',
  imports: [
    CurrencyConverterFormComponent
  ],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})
export class CurrencyConverterComponent {

}
