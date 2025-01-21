import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {LOCAL_STORAGE_PREFIX, USER} from '../auth/const/localstorage-keys';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    HeaderComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {

  clearLocalStorage(): void {
    localStorage.clear();
    location.reload();
  }

  logLocalStorage(): void {
    console.log('LocalStorage', JSON.stringify(JSON.parse(localStorage.getItem(LOCAL_STORAGE_PREFIX + USER)!), null, 2));
  }
}
