import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const navState = this.router.getCurrentNavigation()?.extras?.state || history.state;
    if (navState?.showPopup) {
      this.showPopup = true;
    }
  }

  closePopup(): void {
    this.showPopup = false;
  }

selectMeat(code: string): void {
  this.router.navigate(['/selection', code]);
}

  goToSelection(type: string): void {
  this.router.navigate(['/selection', type]);
}

}
