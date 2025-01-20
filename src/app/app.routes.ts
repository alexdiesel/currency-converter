import {Routes} from '@angular/router';
import {LayoutComponent} from './core/layout/layout.component';
import {AuthGuard} from './core/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./core/auth/auth.component').then(m => m.AuthComponent),
      },
      {
        path: 'currency-converter',
        loadComponent: () => import('./features/currency/currency-converter.component').then(m => m.CurrencyConverterComponent),
        canActivate: [AuthGuard]
      },
      {path: '', redirectTo: 'login', pathMatch: 'full'},
    ],
  },
];
