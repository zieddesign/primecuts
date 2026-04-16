import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from '../../shared/header/header';
import { VirtualKeyboardComponent } from '../../shared/virtual-keyboard/virtual-keyboard';
import { PopupService } from '../../shared/services/popup.service';
import { AdvisorService } from '../../shared/services/advisor.service';

@Component({
  selector: 'app-meat-choice',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    HeaderComponent,
    VirtualKeyboardComponent,
  ],
  templateUrl: './meat-choice.html',
  styleUrls: ['./meat-choice.scss'],
})
export class MeatChoiceComponent implements OnInit {

  showPopup = false;
  showKeyboard = false;
  clientName = '';
  currentLang: 'fr' | 'en' | 'ar' = 'fr';
  meats = [
    { code: 'beef', labelKey: 'MEAT.BEEF', sublabelKey: 'MEAT.BEEF_SUB', image: 'assets/images/beef-butch-primecuts.png' },
    { code: 'agneau', labelKey: 'MEAT.AGNEAU', sublabelKey: 'MEAT.AGNEAU_SUB', image: 'assets/images/lamb-butche.png' },
    { code: 'camel', labelKey: 'MEAT.CAMEL', sublabelKey: 'MEAT.CAMEL_SUB', image: 'assets/images/camel-butch.png' },
    { code: 'chevre', labelKey: 'MEAT.CHEVRE', sublabelKey: 'MEAT.CHEVRE_SUB', image: 'assets/images/goat-butche.png' },
  ];

  constructor(
    private translate: TranslateService,
    private router: Router,
    private popupService: PopupService,
    public advisorService: AdvisorService
  ) { }

  ngOnInit(): void {
    const lang = this.translate.currentLang ?? this.translate.getDefaultLang() ?? 'fr';
    if (lang === 'fr' || lang === 'en' || lang === 'ar') {
      this.currentLang = lang;
    } else {
      this.currentLang = 'fr';
    }

    const navState = this.router.getCurrentNavigation()?.extras?.state || history.state;
    if (navState?.showPopup) {
      this.showPopup = true;
    }
  }

  openKeyboard(): void {
    this.showKeyboard = true;
  }

  onKeyboardChange(val: string): void {
    this.clientName = val;
  }

  onKeyboardConfirm(val: string): void {
    this.clientName = val;
    this.showKeyboard = false;
  }

  onKeyboardClose(): void {
    this.showKeyboard = false;
  }

  closePopup(): void {
    this.showPopup = false;
    this.showKeyboard = false;
  }

  confirmAndStart(): void {
    this.showPopup = false;
    this.showKeyboard = false;
    if (this.clientName) {
      this.popupService.confirmName(this.clientName);
    }
  }

  selectMeat(code: string): void {
    this.router.navigate(['/selection', code]);
  }

  goToSelection(type: string): void {
    this.router.navigate(['/selection', type]);
  }
  onNameConfirmed(): void {
    console.log('Nom confirmé :', this.clientName);
    this.showKeyboard = false;
  }


}