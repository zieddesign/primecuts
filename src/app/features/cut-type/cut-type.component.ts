import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../shared/header/header';

@Component({
  selector: 'app-cut-type',
  standalone: true,
  imports: [CommonModule, TranslateModule, HeaderComponent],
  templateUrl: './cut-type.component.html',
  styleUrl: './cut-type.component.scss',
})
export class CutTypeComponent implements OnInit {
  // Current selection state from route parameters
  meatType = 'beef';
  selectedPart = 'entrecote';

  // Modal visibility flags
  showCubePopup = false;
  showTranchePopup = false;
  showHachePopup = false;

  // Selected sub-options for specific cut types
  selectedCubeOption = 'c2';
  selectedTrancheOption = 's2';
  selectedHacheOptions: string[] = []; // Multiple options allowed for Ground Meat

  // Main navigation cards displayed in the grid
  cutTypes = [
    { code: 'tranche', labelKey: 'CUT_TYPE.TRANCHE', sublabelKey: 'CUT_TYPE.TRANCHE_SUB', image: 'assets/images/tranche-main.png' },
    { code: 'cube', labelKey: 'CUT_TYPE.CUBE', sublabelKey: 'CUT_TYPE.CUBE_SUB', image: 'assets/images/cube-main.png' },
    { code: 'roulette', labelKey: 'CUT_TYPE.ROULETTE', sublabelKey: 'CUT_TYPE.ROULETTE_SUB', image: 'assets/images/roulette.png' },
    { code: 'hache', labelKey: 'CUT_TYPE.HACHE', sublabelKey: 'CUT_TYPE.HACHE_SUB', image: 'assets/images/hache.png' }
  ];

  // Options for Slicing (Tranche) thickness
  trancheOptions = [
    { code: 's1', label: 'S1 — Thin — 5mm' },
    { code: 's2', label: 'S2 — Normal — 12mm' },
    { code: 's3', label: 'S3 — Thick — 20mm' }
  ];

  // Options for Dicing (Cube) size
  cubeOptions = [
    { code: 'c1', label: 'C1 — Small — 2cm' },
    { code: 'c2', label: 'C2 — Medium — 3cm' },
    { code: 'c3', label: 'C3 — Large — 4cm' }
  ];

  // Options for Ground Meat (Haché) preferences
  hacheOptions = [
    { code: 'ordinaire', label: 'POPUP_HACHE.ORDINAIRE' },
    { code: 'sans_epice', label: 'POPUP_HACHE.SANS_EPICE' },
    { code: 'epice_chef', label: 'POPUP_HACHE.EPICE_CHEF' },
    { code: 'gras_0', label: 'POPUP_HACHE.GRAS_0' },
    { code: 'gras_10', label: 'POPUP_HACHE.GRAS_10' },
    { code: 'gras_20', label: 'POPUP_HACHE.GRAS_20' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Extract parameters from the URL (e.g., /cut-type/beef/entrecote)
    this.meatType = this.route.snapshot.paramMap.get('type') || 'beef';
    this.selectedPart = this.route.snapshot.paramMap.get('part') || 'entrecote';
  }

  /**
   * Triggered when clicking a cut type card. 
   * Opens a popup for types that need details, otherwise navigates to the next screen.
   */
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
        // No popup needed for roulette, go straight to weight input
        this.router.navigate(['/quantity-price', this.meatType, this.selectedPart, 'roulette']);
        break;
      default:
        this.router.navigate(['/quantity-price', this.meatType, this.selectedPart, code]);
    }
  }

  // --- DICING (CUBE) METHODS ---
  selectCubeOption(code: string): void {
    this.selectedCubeOption = code;
  }

  confirmCube(): void {
    this.showCubePopup = false;
    // Pass selection as a URL parameter to the quantity-price screen
    this.router.navigate(['/quantity-price', this.meatType, this.selectedPart, 'cube', this.selectedCubeOption]);
  }

  closeCubePopup(): void {
    this.showCubePopup = false;
  }

  // --- SLICING (TRANCHE) METHODS ---
  selectTrancheOption(code: string): void {
    this.selectedTrancheOption = code;
  }

  confirmTranche(): void {
    this.showTranchePopup = false;
    // Pass selection as a URL parameter to the quantity-price screen
    this.router.navigate(['/quantity-price', this.meatType, this.selectedPart, 'tranche', this.selectedTrancheOption]);
  }

  closeTranchePopup(): void {
    this.showTranchePopup = false;
  }

  // --- GROUND MEAT (HACHÉ) METHODS ---
  /**
   * Toggles selection for Ground Meat options (multiple choice)
   */
  toggleHacheOption(code: string): void {
    const index = this.selectedHacheOptions.indexOf(code);
    if (index > -1) {
      this.selectedHacheOptions.splice(index, 1);
    } else {
      this.selectedHacheOptions.push(code);
    }
  }

  isHacheSelected(code: string): boolean {
    return this.selectedHacheOptions.includes(code);
  }

  confirmHache(): void {
    this.showHachePopup = false;
    // Note: Redirection is now to weight input (quantity-price) 
    // rather than the summary to ensure price calculation.
    this.router.navigate(['/quantity-price', this.meatType, this.selectedPart, 'hache']);
  }

  closeHachePopup(): void {
    this.showHachePopup = false;
  }

  // --- GLOBAL NAVIGATION ---
  /**
   * Navigate back to the part selection screen
   */
  goBack(): void {
    this.router.navigate(['/selection', this.meatType]);
  }

  /**
   * Manual navigation to summary (if required by bottom bar)
   */
  goNext(): void {
    this.router.navigate(['/summary']);
  }
}