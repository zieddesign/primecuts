import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'language',
    pathMatch: 'full'
  },
  {
    path: 'language',
    loadComponent: () =>
      import('./features/language/language.component')
        .then(m => m.LanguageComponent)
  }
];