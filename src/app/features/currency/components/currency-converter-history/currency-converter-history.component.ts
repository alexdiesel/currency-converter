import {ChangeDetectionStrategy, Component, inject,} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe, DatePipe} from '@angular/common';
import {HistoryService} from '../../services/history.service';

@Component({
  selector: 'app-currency-converter-history',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, DatePipe],
  templateUrl: './currency-converter-history.component.html',
  styleUrl: './currency-converter-history.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyConverterHistoryComponent {

  private historyService = inject(HistoryService);
  history$ = this.historyService.getExchangeHistory();

  remove(id: number): void {
    this.historyService.removeExchangeHistory(id)
  }

}
