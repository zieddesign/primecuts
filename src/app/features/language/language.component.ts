import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterComponent } from '../../shared/footer/footer';
import { HeaderComponent } from '../../shared/header/header';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, TranslateModule],
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent {

  languages = [
    { code: 'fr', label: 'Français', sublabel: 'FRENCH', flag: 'assets/images/fr.svg' },
    { code: 'ar', label: 'العربية', sublabel: 'ARABIC', flag: 'assets/images/tn.svg' },
    { code: 'en', label: 'English', sublabel: 'ANGLAIS', flag: 'assets/images/gb.svg' }
  ];

  selectedLang: string = '';

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {}

  selectLanguage(code: string): void {
    this.selectedLang = code;
    this.translate.use(code);
    localStorage.setItem('lang', code);

    this.router.navigate(['/meat-choice'], { state: { showPopup: true } });
  }
}
