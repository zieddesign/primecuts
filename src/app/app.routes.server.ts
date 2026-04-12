import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'splash', renderMode: RenderMode.Prerender },
  { path: 'language', renderMode: RenderMode.Prerender },
  { path: 'meat-choice', renderMode: RenderMode.Prerender },
  { path: 'selection/:type', renderMode: RenderMode.Server },
  { path: 'cut-type/:type/:part', renderMode: RenderMode.Server },
  { path: 'quantity-price/:type/:part/:cutType', renderMode: RenderMode.Server },
  { path: 'quantity-price/:type/:part/:cutType/:size', renderMode: RenderMode.Server },
  
  { path: 'emballage/:type/:part/:cutType/:quantity', renderMode: RenderMode.Server },
  { path: 'emballage/:type/:part/:cutType/:size/:quantity', renderMode: RenderMode.Server },

  { path: '**', renderMode: RenderMode.Server }
];