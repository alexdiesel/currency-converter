import {Routes} from '@angular/router';
import {LayoutComponent} from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'login', loadComponent: () => import('./pages/auth/auth.component').then(m => m.AuthComponent) },
      { path: 'currency', loadComponent: () => import('./pages/currency/currency-converter.component').then(m => m.CurrencyConverterComponent) },
      { path: '', redirectTo: 'auth', pathMatch: 'full' },
    ],
  },
];
