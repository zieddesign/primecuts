import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../shared/header/header';
import { CommonModule } from '@angular/common';

export interface CutData {
  code: string;
  labelKey: string;
  sublabelKey: string;
  rating: number;
  tenderness: number;   // /5
  juiciness: string;    // i18n key
  flavor: string;       // i18n key
  marbling: string;     // i18n key
  leanness: string;     // i18n key
  bone: boolean;
  difficulty: string;   // i18n key
  price: string;        // i18n key
  cooking: string;      // i18n key
  dishes: string;       // i18n key
  avoid: string;        // i18n key
}

@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [CommonModule, TranslateModule, HeaderComponent],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.scss',
})
export class SelectionComponent implements OnInit {

  meatType = 'beef';
  selectedMeat: any;
  cuts: CutData[] = [];
  selectedCut!: CutData;

  meats = [
    { code: 'beef',   labelKey: 'MEAT.BEEF',   sublabelKey: 'MEAT.BEEF_SUB',   image: 'assets/images/beef.jpg' },
    { code: 'agneau', labelKey: 'MEAT.AGNEAU', sublabelKey: 'MEAT.AGNEAU_SUB', image: 'assets/images/agneau.jpg' },
    { code: 'camel',  labelKey: 'MEAT.CAMEL',  sublabelKey: 'MEAT.CAMEL_SUB',  image: 'assets/images/camel.jpg' },
    { code: 'chevre', labelKey: 'MEAT.CHEVRE', sublabelKey: 'MEAT.CHEVRE_SUB', image: 'assets/images/chevre.jpg' },
  ];

  // Dictionnaire de toutes les coupes par animal (Données extraites de vos PDF)
  private readonly MEAT_DATA: Record<string, CutData[]> = {
    beef: [
      { code: 'entrecote', labelKey: 'CUTS.ENTRECOTE', sublabelKey: 'CUTS.RIBEYE', rating: 4, tenderness: 4, juiciness: 'CUTS_DATA.HIGH', flavor: 'CUTS_DATA.STRONG', marbling: 'CUTS_DATA.HIGH', leanness: 'CUTS_DATA.BALANCED', bone: false, difficulty: 'CUTS_DATA.EASY', price: 'CUTS_DATA.PREMIUM', cooking: 'CUTS_DATA.ENTRECOTE_COOKING', dishes: 'CUTS_DATA.ENTRECOTE_DISHES', avoid: 'CUTS_DATA.ENTRECOTE_AVOID' },
      { code: 'filet', labelKey: 'CUTS.FILET', sublabelKey: 'CUTS.FILET', rating: 5, tenderness: 5, juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.MILD', marbling: 'CUTS_DATA.LOW', leanness: 'CUTS_DATA.LEAN', bone: false, difficulty: 'CUTS_DATA.EASY', price: 'CUTS_DATA.PREMIUM', cooking: 'CUTS_DATA.FILET_COOKING', dishes: 'CUTS_DATA.FILET_DISHES', avoid: 'CUTS_DATA.FILET_AVOID' },
      { code: 'bavette', labelKey: 'CUTS.BAVETTE', sublabelKey: 'CUTS.BAVETTE', rating: 3, tenderness: 3, juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.STRONG', marbling: 'CUTS_DATA.LOW', leanness: 'CUTS_DATA.LEAN', bone: false, difficulty: 'CUTS_DATA.EASY', price: 'CUTS_DATA.MID', cooking: 'CUTS_DATA.BAVETTE_COOKING', dishes: 'CUTS_DATA.BAVETTE_DISHES', avoid: 'CUTS_DATA.BAVETTE_AVOID' }
    ],
    agneau: [
      { code: 'filet', labelKey: 'CUTS.FILET', sublabelKey: 'CUTS.FILET_SUB', rating: 5, tenderness: 5, juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.MILD', marbling: 'CUTS_DATA.LOW', leanness: 'CUTS_DATA.LEAN', bone: false, difficulty: 'CUTS_DATA.EASY', price: 'CUTS_DATA.PREMIUM', cooking: 'CUTS_DATA.LAMB_FILET_COOK', dishes: 'CUTS_DATA.LAMB_FILET_DISH', avoid: 'CUTS_DATA.LAMB_FILET_AVOID' },
      { code: 'cotelettes', labelKey: 'CUTS.COTELETTES', sublabelKey: 'CUTS.COTELETTES_SUB', rating: 4, tenderness: 4, juiciness: 'CUTS_DATA.HIGH', flavor: 'CUTS_DATA.MEDIUM', marbling: 'CUTS_DATA.MEDIUM', leanness: 'CUTS_DATA.BALANCED', bone: true, difficulty: 'CUTS_DATA.EASY', price: 'CUTS_DATA.MID', cooking: 'CUTS_DATA.LAMB_COTE_COOK', dishes: 'CUTS_DATA.LAMB_COTE_DISH', avoid: 'CUTS_DATA.LAMB_COTE_AVOID' },
      { code: 'epaule', labelKey: 'CUTS.EPAULE', sublabelKey: 'MEAT.AGNEAU_SUB', rating: 3, tenderness: 3, juiciness: 'CUTS_DATA.HIGH', flavor: 'CUTS_DATA.STRONG', marbling: 'CUTS_DATA.MEDIUM', leanness: 'CUTS_DATA.BALANCED', bone: true, difficulty: 'CUTS_DATA.MODERATE', price: 'CUTS_DATA.MID', cooking: 'CUTS_DATA.LAMB_EPAULE_COOK', dishes: 'CUTS_DATA.LAMB_EPAULE_DISH', avoid: 'CUTS_DATA.LAMB_EPAULE_AVOID' }
    ],
    camel: [
      { code: 'leg', labelKey: 'CUTS.LEG_CAMEL', sublabelKey: 'MEAT.CAMEL_SUB', rating: 3, tenderness: 3, juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.STRONG', marbling: 'CUTS_DATA.LOW', leanness: 'CUTS_DATA.LEAN', bone: false, difficulty: 'CUTS_DATA.MODERATE', price: 'CUTS_DATA.MID', cooking: 'CUTS_DATA.CAMEL_LEG_COOK', dishes: 'CUTS_DATA.CAMEL_LEG_DISH', avoid: 'CUTS_DATA.CAMEL_LEG_AVOID' },
      { code: 'hump', labelKey: 'CUTS.HUMP_FAT', sublabelKey: 'CUTS.HUMP_SUB', rating: 2, tenderness: 1, juiciness: 'CUTS_DATA.VERY_HIGH', flavor: 'CUTS_DATA.STRONG', marbling: 'CUTS_DATA.HIGH', leanness: 'CUTS_DATA.FATTY', bone: false, difficulty: 'CUTS_DATA.MODERATE', price: 'CUTS_DATA.VALUE', cooking: 'CUTS_DATA.CAMEL_HUMP_COOK', dishes: 'CUTS_DATA.CAMEL_HUMP_DISH', avoid: 'CUTS_DATA.CAMEL_HUMP_AVOID' }
    ],
    chevre: [
      { code: 'cotelettes', labelKey: 'CUTS.COTELETTES', sublabelKey: 'CUTS.COTELETTES_SUB', rating: 4, tenderness: 4, juiciness: 'CUTS_DATA.HIGH', flavor: 'CUTS_DATA.MEDIUM', marbling: 'CUTS_DATA.MEDIUM', leanness: 'CUTS_DATA.BALANCED', bone: true, difficulty: 'CUTS_DATA.EASY', price: 'CUTS_DATA.MID', cooking: 'CUTS_DATA.CHEVRE_COTE_COOK', dishes: 'CUTS_DATA.CHEVRE_COTE_DISH', avoid: 'CUTS_DATA.CHEVRE_COTE_AVOID' },
      { code: 'quartier_arriere', labelKey: 'CUTS.QUARTIER_ARR', sublabelKey: 'CUTS.QUARTIER_SUB', rating: 4, tenderness: 4, juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.MEDIUM', marbling: 'CUTS_DATA.LOW', leanness: 'CUTS_DATA.LEAN', bone: true, difficulty: 'CUTS_DATA.MODERATE', price: 'CUTS_DATA.PREMIUM', cooking: 'CUTS_DATA.CHEVRE_ARR_COOK', dishes: 'CUTS_DATA.CHEVRE_ARR_DISH', avoid: 'CUTS_DATA.CHEVRE_ARR_AVOID' }
    ]
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 1. Récupérer le type de viande depuis l'URL
    this.meatType = this.route.snapshot.paramMap.get('type') || 'beef';
    
    // 2. Sélectionner l'objet viande correspondant
    this.selectedMeat = this.meats.find(m => m.code === this.meatType) || this.meats[0];

    // 3. Charger les coupes spécifiques à cette viande
    this.cuts = this.MEAT_DATA[this.meatType] || this.MEAT_DATA['beef'];

    // 4. Par défaut, on sélectionne la première coupe de la liste
    if (this.cuts.length > 0) {
      this.selectedCut = this.cuts[0];
    }
  }

  selectCut(cut: CutData): void {
    this.selectedCut = cut;
  }

  getStars(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < rating);
  }

  getTendernessStars(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < rating);
  }

  goBack(): void {
    this.router.navigate(['/meat-choice']);
  }

  goNext(): void {
    this.router.navigate(['/cut-type', this.meatType, this.selectedCut.code]);
  }
}