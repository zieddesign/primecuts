import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core'; // Ajoutez Inject et PLATFORM_ID
import { isPlatformBrowser } from '@angular/common'; // Ajoutez ceci
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../shared/header/header';

@Component({
  selector: 'app-meat-choice',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, HeaderComponent],
  templateUrl: './meat-choice.html',
  styleUrls: ['./meat-choice.scss'],
})
export class MeatChoiceComponent implements OnInit {
  showPopup = false;
  clientName = '';

  meats = [
    { code: 'beef', labelKey: 'MEAT.BEEF', sublabelKey: 'MEAT.BEEF_SUB', image: 'assets/images/beef.jpg' },
    { code: 'agneau', labelKey: 'MEAT.AGNEAU', sublabelKey: 'MEAT.AGNEAU_SUB', image: 'assets/images/agneau.jpg' },
    { code: 'camel', labelKey: 'MEAT.CAMEL', sublabelKey: 'MEAT.CAMEL_SUB', image: 'assets/images/camel.jpg' },
    { code: 'chevre', labelKey: 'MEAT.CHEVRE', sublabelKey: 'MEAT.CHEVRE_SUB', image: 'assets/images/chevre.jpg' }
  ];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      
      setTimeout(() => {
        const shouldShow = localStorage.getItem('showWelcomePopup');
        if (shouldShow === 'true') {
          this.showPopup = true;
          localStorage.removeItem('showWelcomePopup');
        }
      }, 0);
      
    }
  }

  closePopup(): void {
    this.showPopup = false;
  }


  selectMeat(code: string): void {
    this.router.navigate(['/selection', code]);
  }
}