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
  showTranchePopup = false;
  selectedTrancheOption = 's2';
  cutTypes = [
    { code: 'tranche', labelKey: 'CUT_TYPE.TRANCHE', sublabelKey: 'CUT_TYPE.TRANCHE_SUB', image: '' },
    { code: 'cube', labelKey: 'CUT_TYPE.CUBE', sublabelKey: 'CUT_TYPE.CUBE_SUB', image: '' },
    { code: 'roulette', labelKey: 'CUT_TYPE.ROULETTE', sublabelKey: 'CUT_TYPE.ROULETTE_SUB', image: '' },
    { code: 'hache', labelKey: 'CUT_TYPE.HACHE', sublabelKey: 'CUT_TYPE.HACHE_SUB', image: '' }
  ];
  trancheOptions = [
    { code: 's1', label: 'S1 — Fine — 5mm', sublabel: 'Tranche fine pour carpaccio' },
    { code: 's2', label: 'S2 — Normale — 12mm', sublabel: 'Format steak classique' },
    { code: 's3', label: 'S3 — Épaisse — 20mm', sublabel: 'Steak généreux, grillé' }
  ];
  cubeOptions = [
    { code: 'c1', label: 'C1 — Petit — 2cm', sublabel: 'Brochettes légères' },
    { code: 'c2', label: 'C2 — Moyen — 3cm', sublabel: 'Format standard/tajine' },
    { code: 'c3', label: 'C3 — Grand — 4cm', sublabel: 'Ragout & cuisson lente' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.meatType = this.route.snapshot.paramMap.get('type') || 'beef';
    this.selectedPart = this.route.snapshot.paramMap.get('part') || 'entrecote';
  }

  selectCutType(code: string): void {
    if (code === 'cube') {
      this.showCubePopup = true;
      return;
    }
    if (code === 'tranche') {
      this.showTranchePopup = true;
      return;
    }
    this.router.navigate(['/summary', this.meatType, this.selectedPart, code]);
  }

  goBack(): void {
    this.router.navigate(['/selection', this.meatType]);
  }

  goNext(): void {
    this.router.navigate(['/summary']);
  }
  showCubePopup = false;
  selectedCubeOption = 'c2';




  selectCubeOption(code: string): void {
    this.selectedCubeOption = code;
  }

  closeCubePopup(): void {
    this.showCubePopup = false;
  }

  confirmCube(): void {
    this.showCubePopup = false;
    this.router.navigate(['/summary', this.meatType, this.selectedPart, 'cube', this.selectedCubeOption]);
  }
  selectTrancheOption(code: string): void {
    this.selectedTrancheOption = code;
  }

  closeTranchePopup(): void {
    this.showTranchePopup = false;
  }

  confirmTranche(): void {
    this.showTranchePopup = false;
    this.router.navigate(['/summary', this.meatType, this.selectedPart, 'tranche', this.selectedTrancheOption]);
  }
}