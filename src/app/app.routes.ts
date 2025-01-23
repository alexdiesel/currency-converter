import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'auth',
        loadComponent: () => import('./core/auth/auth.component').then((m) => m.AuthComponent),
        children: [
          {
            path: 'login',
            loadComponent: () =>
              import('./core/auth/components/login-form/login-form.component').then((m) => m.LoginFormComponent),
          },
          {
            path: 'registration',
            loadComponent: () =>
              import('./core/auth/components/reg-form/reg-form.component').then((m) => m.RegFormComponent),
          },
          { path: '', redirectTo: 'login', pathMatch: 'full' },
        ],
      },
      {
        path: 'currency-converter',
        loadComponent: () =>
          import('./features/currency/currency-converter.component').then((m) => m.CurrencyConverterComponent),
      },
      { path: '', redirectTo: 'auth', pathMatch: 'full' },
      { path: '**', redirectTo: 'auth', pathMatch: 'full' },
    ],
  },
];
