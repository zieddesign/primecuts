import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../shared/header/header';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-cut-type',
  standalone: true,
  imports: [CommonModule, TranslateModule, HeaderComponent],
  templateUrl: './cut-type.component.html',
  styleUrls: ['./cut-type.component.scss'],
})
export class CutTypeComponent implements OnInit {
  // ── Params ───────────────────────────────
  meatType = 'beef';
  selectedPart = 'entrecote';
  customerName: string = '';

  // ── Popups ───────────────────────────────
  showCubePopup = false;
  showTranchePopup = false;
  showHachePopup = false;

  // ── Options sélectionnées ────────────────
  selectedCubeOption = 'c2';
  selectedTrancheOption = 's2';
  selectedHacheOptions: string[] = [];

  // ── Types de découpe affichés ────────────
  cutTypes = [
    { code: 'tranche',  labelKey: 'CUT_TYPE.TRANCHE',  sublabelKey: 'CUT_TYPE.TRANCHE_SUB',  image: 'assets/images/tranche-main.png' },
    { code: 'cube',     labelKey: 'CUT_TYPE.CUBE',     sublabelKey: 'CUT_TYPE.CUBE_SUB',     image: 'assets/images/cube-main.png' },
    { code: 'roulette', labelKey: 'CUT_TYPE.ROULETTE', sublabelKey: 'CUT_TYPE.ROULETTE_SUB', image: 'assets/images/roulette.png' },
    { code: 'hache',    labelKey: 'CUT_TYPE.HACHE',    sublabelKey: 'CUT_TYPE.HACHE_SUB',    image: 'assets/images/hache.png' }
  ];

  // ── Options tranche ──────────────────────
  trancheOptions = [
    { code: 's1', label: 'S1 — Thin — 5mm' },
    { code: 's2', label: 'S2 — Normal — 12mm' },
    { code: 's3', label: 'S3 — Thick — 20mm' }
  ];

  // ── Options cube ─────────────────────────
  cubeOptions = [
    { code: 'c1', label: 'C1 — Small — 2cm' },
    { code: 'c2', label: 'C2 — Medium — 3cm' },
    { code: 'c3', label: 'C3 — Large — 4cm' }
  ];

  // ── Options haché ────────────────────────
  hacheOptions = [
    { code: 'ordinaire',  label: 'POPUP_HACHE.ORDINAIRE' },
    { code: 'sans_epice', label: 'POPUP_HACHE.SANS_EPICE' },
    { code: 'epice_chef', label: 'POPUP_HACHE.EPICE_CHEF' },
    { code: 'gras_0',     label: 'POPUP_HACHE.GRAS_0' },
    { code: 'gras_10',    label: 'POPUP_HACHE.GRAS_10' },
    { code: 'gras_20',    label: 'POPUP_HACHE.GRAS_20' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.meatType     = this.route.snapshot.paramMap.get('type') || 'beef';
    this.selectedPart = this.route.snapshot.paramMap.get('part') || 'entrecote';
    this.orderService.clientName$.subscribe(name => {
      this.customerName = name;
    });
  }

  // ── Sélection d’un type de découpe ───────
  selectCutType(code: string): void {
    switch (code) {
      case 'cube':
        this.showCubePopup = true;
        break;
      case 'tranche':
        this.showTranchePopup = true;
        break;
      case 'hache':
        this.showHachePopup = true;
        break;
      case 'roulette':
        // Redirection vers la même page que haché (poids + prix)
        this.router.navigate(['/quantity-price', this.meatType, this.selectedPart, 'roulette']);
        break;
      default:
        this.router.navigate(['/quantity-price', this.meatType, this.selectedPart, code]);
    }
  }

  // ── Cube ─────────────────────────────────
  selectCubeOption(code: string): void { this.selectedCubeOption = code; }
  confirmCube(): void {
    this.showCubePopup = false;
    this.router.navigate(['/quantity-price', this.meatType, this.selectedPart, 'cube', this.selectedCubeOption]);
  }
  closeCubePopup(): void { this.showCubePopup = false; }

  // ── Tranche ──────────────────────────────
  selectTrancheOption(code: string): void { this.selectedTrancheOption = code; }
  confirmTranche(): void {
    this.showTranchePopup = false;
    this.router.navigate(['/quantity-price', this.meatType, this.selectedPart, 'tranche', this.selectedTrancheOption]);
  }
  closeTranchePopup(): void { this.showTranchePopup = false; }

  // ── Haché ────────────────────────────────
  toggleHacheOption(code: string): void {
    const index = this.selectedHacheOptions.indexOf(code);
    if (index > -1) this.selectedHacheOptions.splice(index, 1);
    else this.selectedHacheOptions.push(code);
  }
  isHacheSelected(code: string): boolean { return this.selectedHacheOptions.includes(code); }
  confirmHache(): void {
    this.showHachePopup = false;
    this.router.navigate(
      ['/quantity-price', this.meatType, this.selectedPart, 'hache'],
      { queryParams: { options: this.selectedHacheOptions.join(',') } }
    );
  }
  closeHachePopup(): void { this.showHachePopup = false; }

  // ── Navigation globale ───────────────────
  goBack(): void { this.router.navigate(['/selection', this.meatType]); }
  goNext(): void { this.router.navigate(['/summary']); }

  get canGoNext(): boolean {
    if (this.showCubePopup) return !!this.selectedCubeOption;
    if (this.showTranchePopup) return !!this.selectedTrancheOption;
    if (this.showHachePopup) return this.selectedHacheOptions.length > 0;
    return true; 
  }
}
