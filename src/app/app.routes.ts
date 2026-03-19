import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadComponent: () =>
      import('./features/splash-screen/splash-screen')
        .then(m => m.SplashScreen)
  },
  {
    path: 'language',
    loadComponent: () =>
      import('./features/language/language.component')
        .then(m => m.LanguageComponent)
  },
  {
    path: 'meat-choice',
    loadComponent: () =>
      import('./features/meat-choice/meat-choice')
        .then(m => m.MeatChoiceComponent)
  },
  {
    path: 'selection/:type',
    loadComponent: () =>
      import('./features/selection/selection')
        .then(m => m.SelectionComponent)
  }
];