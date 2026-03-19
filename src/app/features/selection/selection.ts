import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../shared/header/header';

@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [CommonModule, UpperCasePipe, TranslateModule, HeaderComponent],
  templateUrl: './selection.html',
  styleUrl: './selection.scss',
})
export class SelectionComponent {

  meatType = 'beef';

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
}