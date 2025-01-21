import {ApplicationConfig, isDevMode, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient} from '@angular/common/http';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {AuthEffects} from './core/auth/store/auth.effects';
import {provideEffects} from '@ngrx/effects';
import {provideStore} from '@ngrx/store';
import {metaReducers, reducers} from './core/auth/store';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(reducers, {metaReducers}),
    provideEffects([AuthEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    }),
    provideAnimationsAsync(),
  ]
};
