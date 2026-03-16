import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header';
import { FooterComponent } from '../../shared/footer/footer';
@Component({
  selector: 'app-language',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './language.component.html',
  styleUrl: './language.component.scss'
})
export class LanguageComponent {

  languages = [
    { code: 'fr', label: 'Français', sublabel: 'FRENCH', flag: 'assets/images/fr.svg' },
    { code: 'ar', label: 'العربية', sublabel: 'ARABIC', flag: 'assets/images/tn.svg' },
    { code: 'en', label: 'English', sublabel: 'ANGLAIS', flag: 'assets/images/gb.svg' }
  ];

  selectedLang: string = '';

  constructor(private router: Router) {}

  selectLanguage(code: string): void {
    this.selectedLang = code;
    localStorage.setItem('lang', code);
    setTimeout(() => {
      this.router.navigate(['/welcome']);
    }, 300);
  }
}