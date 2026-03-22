import { Routes } from '@angular/router';

/**
 * Application Routing Configuration
 * * Note: The order of routes matters. Specific routes with more parameters 
 * should generally come before or alongside their simpler versions.
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
      import('./features/selection/selection')
        .then(m => m.SelectionComponent)
  },
  {
    path: 'cut-type/:type/:part',
    loadComponent: () =>
      import('./features/cut-type/cut-type')
        .then(m => m.CutTypeComponent)
  },

  // --- QUANTITY & PRICE SECTION ---
  
  // 1. Route for cuts WITHOUT a specific size (e.g., Haché, Roulette)
  // URL: /quantity-price/beef/entrecote/hache
  {
    path: 'quantity-price/:type/:part/:cutType',
    loadComponent: () =>
      import('./features/quantity-price/quantity-price')
        .then(m => m.QuantityPriceComponent)
  },
  
  // 2. Route for cuts WITH a specific size (e.g., Cube C2, Tranche S1)
  // URL: /quantity-price/beef/entrecote/cube/c2
  {
    path: 'quantity-price/:type/:part/:cutType/:size',
    loadComponent: () =>
      import('./features/quantity-price/quantity-price')
        .then(m => m.QuantityPriceComponent)
  },

  {
    path: '**',
    redirectTo: 'splash'
  }
];