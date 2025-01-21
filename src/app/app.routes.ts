import {Routes} from '@angular/router';
import {LayoutComponent} from './core/layout/layout.component';
import {AuthGuard} from './core/auth/guards/auth.guard';
import {CurrencyConverterGuard} from './core/auth/guards/currency-converter.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'auth',
        loadComponent: () => import('./core/auth/auth.component').then(m => m.AuthComponent),
        canActivate: [AuthGuard],
        children: [
          {
            path: 'login',
            loadComponent: () => import('./core/auth/components/login-form/login-form.component').then(m => m.LoginFormComponent),
          },
          {
            path: 'registration',
            loadComponent: () => import('./core/auth/components/reg-form/reg-form.component').then(m => m.RegFormComponent),
            // canActivate: [RegGuard], // TODO implement registration guard for registered users but not login
          },
          {path: '', redirectTo: 'login', pathMatch: 'full'}
        ]
      },
      {
        path: 'currency-converter',
        loadComponent: () => import('./features/currency/currency-converter.component').then(m => m.CurrencyConverterComponent),
        canActivate: [CurrencyConverterGuard]
      },
      {path: '', redirectTo: 'auth', pathMatch: 'full'},
    ],
  },
];
