import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../shared/header/header';

@Component({
  selector: 'app-cut-type',
  standalone: true,
  imports: [CommonModule, TranslateModule, HeaderComponent],
  templateUrl: './cut-type.html',
  styleUrl: './cut-type.scss',
})
export class CutTypeComponent {

  meatType = 'beef';
  selectedPart = 'entrecote';

  cutTypes = [
    { code: 'tranche', labelKey: 'CUT_TYPE.TRANCHE', sublabelKey: 'CUT_TYPE.TRANCHE_SUB', image: '' },
    { code: 'cube', labelKey: 'CUT_TYPE.CUBE', sublabelKey: 'CUT_TYPE.CUBE_SUB', image: '' },
    { code: 'roulette', labelKey: 'CUT_TYPE.ROULETTE', sublabelKey: 'CUT_TYPE.ROULETTE_SUB', image: '' },
    { code: 'hache', labelKey: 'CUT_TYPE.HACHE', sublabelKey: 'CUT_TYPE.HACHE_SUB', image: '' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.meatType = this.route.snapshot.paramMap.get('type') || 'beef';
    this.selectedPart = this.route.snapshot.paramMap.get('part') || 'entrecote';
  }

  selectCutType(code: string): void {
    this.router.navigate(['/summary', this.meatType, this.selectedPart, code]);
  }

  goBack(): void {
    this.router.navigate(['/selection', this.meatType]);
  }

  goNext(): void {
    this.router.navigate(['/summary']);
  }
}