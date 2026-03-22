import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../shared/header/header';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [CommonModule,  TranslateModule, HeaderComponent],
  templateUrl: './selection.html',
  styleUrl: './selection.scss',
})
export class SelectionComponent {

  meatType = 'beef';
   meats = [
    { code: 'beef', labelKey: 'MEAT.BEEF', sublabelKey: 'MEAT.BEEF_SUB', image: 'assets/images/beef.jpg' },
    { code: 'agneau', labelKey: 'MEAT.AGNEAU', sublabelKey: 'MEAT.AGNEAU_SUB', image: 'assets/images/agneau.jpg' },
    { code: 'camel', labelKey: 'MEAT.CAMEL', sublabelKey: 'MEAT.CAMEL_SUB', image: 'assets/images/camel.jpg' },
    { code: 'chevre', labelKey: 'MEAT.CHEVRE', sublabelKey: 'MEAT.CHEVRE_SUB', image: 'assets/images/chevre.jpg' }
  ];
selectedMeat = this.meats.find(m => m.code === this.meatType) || this.meats[0];
cuts = [
  { code: 'entrecote', labelKey: 'CUTS.ENTRECOTE', sublabelKey: 'CUTS.RIBEYE', rating: 4 },
  { code: 'filet', labelKey: 'CUTS.FILET', sublabelKey: 'CUTS.FILET', rating: 5 },
  { code: 'bavette', labelKey: 'CUTS.BAVETTE', sublabelKey: 'CUTS.BAVETTE', rating: 3 },
  { code: 'epaule', labelKey: 'CUTS.EPAULE', sublabelKey: 'CUTS.EPAULE', rating: 3 },
  { code: 'rumsteak', labelKey: 'CUTS.RUMSTEAK', sublabelKey: 'CUTS.RUMSTEAK', rating: 4 }
];

selectedCut = this.cuts[0];

details = {
  typeSteak: 'DETAILS.TYPE_ENTRECOTE',
  cuisson: 'DETAILS.CUISSON_SAIGNANT',
  teneurGras: 'DETAILS.GRAS_ELEVEE',
  saveur: 'DETAILS.SAVEUR_PERSILLEE'
};

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.meatType = this.route.snapshot.paramMap.get('type') || 'beef';
      this.selectedMeat = this.meats.find(m => m.code === this.meatType) || this.meats[0];

  }

  selectCut(cut: any): void {
    this.selectedCut = cut;
  }

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }

  goBack(): void {
    this.router.navigate(['/meat-choice']);
  }

  goNext(): void {
    this.router.navigate(['/summary']);
  }
  goToCutType(): void {
  this.router.navigate(['/cut-type', this.meatType, this.selectedCut.code]);
}
}