import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  protected readonly title = signal('primecuts');

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    translate.addLangs(['fr', 'ar', 'en']);
    translate.setDefaultLang('fr');
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lang') || 'fr';
      this.translate.use(savedLang);
      this.setDirection(savedLang);

      this.translate.onLangChange.subscribe(event => {
        this.setDirection(event.lang);
      });
    }
  }

  setDirection(lang: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const html = document.documentElement;
      if (lang === 'ar') {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
      } else {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', lang);
      }
    }
  }
}