import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {selectIsAuthenticated, selectUsername} from '../../auth/store/auth.selectors';
import {AsyncPipe} from '@angular/common';
import {logout} from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  private store = inject(Store);

  isAuthenticated$ = this.store.select(selectIsAuthenticated);
  userName$ = this.store.select(selectUsername);


  logout(): void {
    this.store.dispatch(logout());
  }
}
