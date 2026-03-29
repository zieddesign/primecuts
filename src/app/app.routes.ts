import { Routes } from '@angular/router';

/**
 * Application Routing Configuration
 * Note: L'ordre est crucial. Les routes les plus spécifiques (avec le plus de paramètres)
 * doivent être déclarées avant les versions simplifiées.
 */
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
      import('./features/selection/selection.component')
        .then(m => m.SelectionComponent)
  },
  {
    path: 'cut-type/:type/:part',
    loadComponent: () =>
      import('./features/cut-type/cut-type.component')
        .then(m => m.CutTypeComponent)
  },

  
  {
    path: 'quantity-price/:type/:part/:cutType/:size',
    loadComponent: () =>
      import('./features/quantity-price/quantity-price.component')
        .then(m => m.QuantityPriceComponent)
  },
  {
    path: 'quantity-price/:type/:part/:cutType',
    loadComponent: () =>
      import('./features/quantity-price/quantity-price.component')
        .then(m => m.QuantityPriceComponent)
  },


  {
    path: 'emballage/:type/:part/:cutType/:size/:quantity',
    loadComponent: () =>
      import('./features/emballage/emballage.component')
        .then(m => m.EmballageComponent)
  },
  {
    path: 'emballage/:type/:part/:cutType/:quantity',
    loadComponent: () =>
      import('./features/emballage/emballage.component')
        .then(m => m.EmballageComponent)
  },

  {
    path: 'another-cut',
    loadComponent: () =>
      import('./features/another-cut/another-cut.component')
        .then(m => m.AnotherCutComponent)
  },
  {
    path: 'basket',
    loadComponent: () =>
      import('./features/basket/basket.component')
        .then(m => m.BasketComponent)
  },

  {
    path: '**',
    redirectTo: 'splash'
  }
];