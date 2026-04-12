import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../shared/header/header';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../shared/services/order.service';

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
 styleUrls: ['./selection.component.scss'],

})
export class SelectionComponent implements OnInit {

  meatType = 'beef';
  selectedMeat: any;
  cuts: CutData[] = [];
  selectedCut!: CutData;
  customerName: string = ''
  meats = [
    { code: 'beef',   labelKey: 'MEAT.BEEF',   sublabelKey: 'MEAT.BEEF_SUB',   image: 'assets/images/beef.jpg' },
    { code: 'agneau', labelKey: 'MEAT.AGNEAU', sublabelKey: 'MEAT.AGNEAU_SUB', image: 'assets/images/agneau.jpg' },
    { code: 'camel',  labelKey: 'MEAT.CAMEL',  sublabelKey: 'MEAT.CAMEL_SUB',  image: 'assets/images/camel.jpg' },
    { code: 'chevre', labelKey: 'MEAT.CHEVRE', sublabelKey: 'MEAT.CHEVRE_SUB', image: 'assets/images/chevre.jpg' },
  ];

  private readonly MEAT_DATA: Record<string, CutData[]> = {
  beef: [
    { code: 'filet', labelKey: 'CUTS.FILET', sublabelKey: 'CUTS.FILET', rating: 5, tenderness: 5, juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.MILD', marbling: 'CUTS_DATA.LOW', leanness: 'CUTS_DATA.LEAN', bone: false, difficulty: 'CUTS_DATA.EASY', price: 'CUTS_DATA.PREMIUM', cooking: 'CUTS_DATA.FILET_COOKING', dishes: 'CUTS_DATA.FILET_DISHES', avoid: 'CUTS_DATA.FILET_AVOID' },
    { code: 'entrecote', labelKey: 'CUTS.ENTRECOTE', sublabelKey: 'CUTS.RIBEYE', rating: 4, tenderness: 4, juiciness: 'CUTS_DATA.HIGH', flavor: 'CUTS_DATA.STRONG', marbling: 'CUTS_DATA.HIGH', leanness: 'CUTS_DATA.BALANCED', bone: false, difficulty: 'CUTS_DATA.EASY', price: 'CUTS_DATA.PREMIUM', cooking: 'CUTS_DATA.ENTRECOTE_COOKING', dishes: 'CUTS_DATA.ENTRECOTE_DISHES', avoid: 'CUTS_DATA.ENTRECOTE_AVOID' },
    { code: 'cote', labelKey: 'CUTS.COTE', sublabelKey: 'CUTS.COTE_SUB', rating: 4, tenderness: 4, juiciness: 'CUTS_DATA.HIGH', flavor: 'CUTS_DATA.STRONG', marbling: 'CUTS_DATA.MEDIUM', leanness: 'CUTS_DATA.BALANCED', bone: true, difficulty: 'CUTS_DATA.MODERATE', price: 'CUTS_DATA.PREMIUM', cooking: 'CUTS_DATA.COTE_COOKING', dishes: 'CUTS_DATA.COTE_DISHES', avoid: 'CUTS_DATA.COTE_AVOID' },
    { code: 'rumsteck', labelKey: 'CUTS.RUMSTECK', sublabelKey: 'CUTS.RUMSTECK_SUB', rating: 3, tenderness: 3, juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.MEDIUM', marbling: 'CUTS_DATA.LOW', leanness: 'CUTS_DATA.LEAN', bone: false, difficulty: 'CUTS_DATA.EASY', price: 'CUTS_DATA.MID', cooking: 'CUTS_DATA.RUMSTECK_COOKING', dishes: 'CUTS_DATA.RUMSTECK_DISHES', avoid: 'CUTS_DATA.RUMSTECK_AVOID' },
    { code: 'fauxfilet', labelKey: 'CUTS.FAUXFILET', sublabelKey: 'CUTS.FAUXFILET_SUB', rating: 4, tenderness: 4, juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.STRONG', marbling: 'CUTS_DATA.MEDIUM', leanness: 'CUTS_DATA.BALANCED', bone: false, difficulty: 'CUTS_DATA.EASY', price: 'CUTS_DATA.MID', cooking: 'CUTS_DATA.FAUXFILET_COOKING', dishes: 'CUTS_DATA.FAUXFILET_DISHES', avoid: 'CUTS_DATA.FAUXFILET_AVOID' },
    { code: 'macreuse', labelKey: 'CUTS.MACREUSE', sublabelKey: 'CUTS.MACREUSE_SUB', rating: 3, tenderness: 3, juiciness: 'CUTS_DATA.HIGH', flavor: 'CUTS_DATA.STRONG', marbling: 'CUTS_DATA.LOW', leanness: 'CUTS_DATA.LEAN', bone: false, difficulty: 'CUTS_DATA.MODERATE', price: 'CUTS_DATA.VALUE', cooking: 'CUTS_DATA.MACREUSE_COOKING', dishes: 'CUTS_DATA.MACREUSE_DISHES', avoid: 'CUTS_DATA.MACREUSE_AVOID' },
    { code: 'jarret', labelKey: 'CUTS.JARRET', sublabelKey: 'CUTS.JARRET_SUB', rating: 2, tenderness: 2, juiciness: 'CUTS_DATA.HIGH', flavor: 'CUTS_DATA.STRONG', marbling: 'CUTS_DATA.LOW', leanness: 'CUTS_DATA.LEAN', bone: true, difficulty: 'CUTS_DATA.MODERATE', price: 'CUTS_DATA.VALUE', cooking: 'CUTS_DATA.JARRET_COOKING', dishes: 'CUTS_DATA.JARRET_DISHES', avoid: 'CUTS_DATA.JARRET_AVOID' },
    { code: 'collier', labelKey: 'CUTS.COLLIER', sublabelKey: 'CUTS.COLLIER_SUB', rating: 2, tenderness: 2, juiciness: 'CUTS_DATA.HIGH', flavor: 'CUTS_DATA.STRONG', marbling: 'CUTS_DATA.LOW', leanness: 'CUTS_DATA.LEAN', bone: true, difficulty: 'CUTS_DATA.MODERATE', price: 'CUTS_DATA.VALUE', cooking: 'CUTS_DATA.COLLIER_COOKING', dishes: 'CUTS_DATA.COLLIER_DISHES', avoid: 'CUTS_DATA.COLLIER_AVOID' },
    { code: 'poitrine', labelKey: 'CUTS.POITRINE', sublabelKey: 'CUTS.POITRINE_SUB', rating: 3, tenderness: 3, juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.STRONG', marbling: 'CUTS_DATA.MEDIUM', leanness: 'CUTS_DATA.BALANCED', bone: true, difficulty: 'CUTS_DATA.MODERATE', price: 'CUTS_DATA.MID', cooking: 'CUTS_DATA.POITRINE_COOKING', dishes: 'CUTS_DATA.POITRINE_DISHES', avoid: 'CUTS_DATA.POITRINE_AVOID' },
    { code: 'platcote', labelKey: 'CUTS.PLATCOTE', sublabelKey: 'CUTS.PLATCOTE_SUB', rating: 3, tenderness: 3, juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.STRONG', marbling: 'CUTS_DATA.MEDIUM', leanness: 'CUTS_DATA.BALANCED', bone: true, difficulty: 'CUTS_DATA.MODERATE', price: 'CUTS_DATA.MID', cooking: 'CUTS_DATA.PLATCOTE_COOKING', dishes: 'CUTS_DATA.PLATCOTE_DISHES', avoid: 'CUTS_DATA.PLATCOTE_AVOID' },
    { code: 'bavette', labelKey: 'CUTS.BAVETTE', sublabelKey: 'CUTS.BAVETTE', rating: 3, tenderness: 3, juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.STRONG', marbling: 'CUTS_DATA.LOW', leanness: 'CUTS_DATA.LEAN', bone: false, difficulty: 'CUTS_DATA.EASY', price: 'CUTS_DATA.MID', cooking: 'CUTS_DATA.BAVETTE_COOKING', dishes: 'CUTS_DATA.BAVETTE_DISHES', avoid: 'CUTS_DATA.BAVETTE_AVOID' },
    { code: 'hache', labelKey: 'CUTS.HACHE', sublabelKey: 'CUTS.HACHE_SUB', rating: 2, tenderness: 2, juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.MILD', marbling: 'CUTS_DATA.LOW', leanness: 'CUTS_DATA.LEAN', bone: false, difficulty: 'CUTS_DATA.EASY', price: 'CUTS_DATA.VALUE', cooking: 'CUTS_DATA.HACHE_COOKING', dishes: 'CUTS_DATA.HACHE_DISHES', avoid: 'CUTS_DATA.HACHE_AVOID' }
  ],
   agneau: [
    { code: 'filet', labelKey: 'CUTS.LAMB_FILET', sublabelKey: 'CUTS.LAMB_FILET_SUB', rating: 5, tenderness: 5,
      juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.MILD', marbling: 'CUTS_DATA.LOW',
      leanness: 'CUTS_DATA.LEAN', bone: false, difficulty: 'CUTS_DATA.EASY', price: 'CUTS_DATA.PREMIUM',
      cooking: 'CUTS_DATA.LAMB_FILET_COOKING', dishes: 'CUTS_DATA.LAMB_FILET_DISHES', avoid: 'CUTS_DATA.LAMB_FILET_AVOID' },

    { code: 'carre', labelKey: 'CUTS.LAMB_CARRE', sublabelKey: 'CUTS.LAMB_CARRE_SUB', rating: 4, tenderness: 4,
      juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.MEDIUM', marbling: 'CUTS_DATA.MEDIUM',
      leanness: 'CUTS_DATA.BALANCED', bone: true, difficulty: 'CUTS_DATA.MODERATE', price: 'CUTS_DATA.PREMIUM',
      cooking: 'CUTS_DATA.LAMB_CARRE_COOKING', dishes: 'CUTS_DATA.LAMB_CARRE_DISHES', avoid: 'CUTS_DATA.LAMB_CARRE_AVOID' },

    { code: 'cotelettes', labelKey: 'CUTS.LAMB_COTELETTES', sublabelKey: 'CUTS.LAMB_COTELETTES_SUB', rating: 4, tenderness: 4,
      juiciness: 'CUTS_DATA.HIGH', flavor: 'CUTS_DATA.MEDIUM', marbling: 'CUTS_DATA.MEDIUM',
      leanness: 'CUTS_DATA.BALANCED', bone: true, difficulty: 'CUTS_DATA.EASY', price: 'CUTS_DATA.MID',
      cooking: 'CUTS_DATA.LAMB_COTELETTES_COOKING', dishes: 'CUTS_DATA.LAMB_COTELETTES_DISHES', avoid: 'CUTS_DATA.LAMB_COTELETTES_AVOID' },

    { code: 'gigot', labelKey: 'CUTS.LAMB_GIGOT', sublabelKey: 'CUTS.LAMB_GIGOT_SUB', rating: 4, tenderness: 4,
      juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.MEDIUM', marbling: 'CUTS_DATA.LOW',
      leanness: 'CUTS_DATA.LEAN', bone: true, difficulty: 'CUTS_DATA.MODERATE', price: 'CUTS_DATA.UPPERMID',
      cooking: 'CUTS_DATA.LAMB_GIGOT_COOKING', dishes: 'CUTS_DATA.LAMB_GIGOT_DISHES', avoid: 'CUTS_DATA.LAMB_GIGOT_AVOID' },

    { code: 'epaule', labelKey: 'CUTS.LAMB_EPAULE', sublabelKey: 'CUTS.LAMB_EPAULE_SUB', rating: 3, tenderness: 3,
      juiciness: 'CUTS_DATA.HIGH', flavor: 'CUTS_DATA.STRONG', marbling: 'CUTS_DATA.MEDIUM',
      leanness: 'CUTS_DATA.BALANCED', bone: true, difficulty: 'CUTS_DATA.MODERATE', price: 'CUTS_DATA.MID',
      cooking: 'CUTS_DATA.LAMB_EPAULE_COOKING', dishes: 'CUTS_DATA.LAMB_EPAULE_DISHES', avoid: 'CUTS_DATA.LAMB_EPAULE_AVOID' },

    { code: 'collier', labelKey: 'CUTS.LAMB_COLLIER', sublabelKey: 'CUTS.LAMB_COLLIER_SUB', rating: 2, tenderness: 2,
      juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.STRONG', marbling: 'CUTS_DATA.LOW',
      leanness: 'CUTS_DATA.LEAN', bone: true, difficulty: 'CUTS_DATA.MODERATE', price: 'CUTS_DATA.VALUE',
      cooking: 'CUTS_DATA.LAMB_COLLIER_COOKING', dishes: 'CUTS_DATA.LAMB_COLLIER_DISHES', avoid: 'CUTS_DATA.LAMB_COLLIER_AVOID' },

    { code: 'poitrine', labelKey: 'CUTS.LAMB_POITRINE', sublabelKey: 'CUTS.LAMB_POITRINE_SUB', rating: 1, tenderness: 1,
      juiciness: 'CUTS_DATA.HIGH', flavor: 'CUTS_DATA.STRONG', marbling: 'CUTS_DATA.MEDIUM',
      leanness: 'CUTS_DATA.FATTY', bone: true, difficulty: 'CUTS_DATA.MODERATE', price: 'CUTS_DATA.VALUE',
      cooking: 'CUTS_DATA.LAMB_POITRINE_COOKING', dishes: 'CUTS_DATA.LAMB_POITRINE_DISHES', avoid: 'CUTS_DATA.LAMB_POITRINE_AVOID' },

    { code: 'jarret', labelKey: 'CUTS.LAMB_JARRET', sublabelKey: 'CUTS.LAMB_JARRET_SUB', rating: 1, tenderness: 1,
      juiciness: 'CUTS_DATA.HIGH', flavor: 'CUTS_DATA.STRONG', marbling: 'CUTS_DATA.LOW',
      leanness: 'CUTS_DATA.LEAN', bone: true, difficulty: 'CUTS_DATA.ADVANCED', price: 'CUTS_DATA.VALUE',
      cooking: 'CUTS_DATA.LAMB_JARRET_COOKING', dishes: 'CUTS_DATA.LAMB_JARRET_DISHES', avoid: 'CUTS_DATA.LAMB_JARRET_AVOID' },

    { code: 'selle', labelKey: 'CUTS.LAMB_SELLE', sublabelKey: 'CUTS.LAMB_SELLE_SUB', rating: 5, tenderness: 5,
      juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.MEDIUM', marbling: 'CUTS_DATA.LOW',
      leanness: 'CUTS_DATA.LEAN', bone: false, difficulty: 'CUTS_DATA.MODERATE', price: 'CUTS_DATA.PREMIUM',
      cooking: 'CUTS_DATA.LAMB_SELLE_COOKING', dishes: 'CUTS_DATA.LAMB_SELLE_DISHES', avoid: 'CUTS_DATA.LAMB_SELLE_AVOID' },

    { code: 'hache', labelKey: 'CUTS.LAMB_HACHE', sublabelKey: 'CUTS.LAMB_HACHE_SUB', rating: 2, tenderness: 2,
      juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.MEDIUM', marbling: 'CUTS_DATA.VARIABLE',
      leanness: 'CUTS_DATA.VARIABLE', bone: false, difficulty: 'CUTS_DATA.EASY', price: 'CUTS_DATA.FLEXIBLE',
      cooking: 'CUTS_DATA.LAMB_HACHE_COOKING', dishes: 'CUTS_DATA.LAMB_HACHE_DISHES', avoid: 'CUTS_DATA.LAMB_HACHE_AVOID' }
  ],
camel: [
  { code: 'leg', labelKey: 'CUTS.CAMEL_LEG', sublabelKey: 'CUTS.CAMEL_LEG_SUB', rating: 4, tenderness: 4,
    juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.STRONG', marbling: 'CUTS_DATA.LOW',
    leanness: 'CUTS_DATA.LEAN', bone: true, difficulty: 'CUTS_DATA.MODERATE', price: 'CUTS_DATA.MID',
    cooking: 'CUTS_DATA.CAMEL_LEG_COOKING', dishes: 'CUTS_DATA.CAMEL_LEG_DISHES', avoid: 'CUTS_DATA.CAMEL_LEG_AVOID' },

  { code: 'shoulder', labelKey: 'CUTS.CAMEL_SHOULDER', sublabelKey: 'CUTS.CAMEL_SHOULDER_SUB', rating: 4, tenderness: 4,
    juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.STRONG', marbling: 'CUTS_DATA.LOW',
    leanness: 'CUTS_DATA.LEAN', bone: true, difficulty: 'CUTS_DATA.MODERATE', price: 'CUTS_DATA.VALUE',
    cooking: 'CUTS_DATA.CAMEL_SHOULDER_COOKING', dishes: 'CUTS_DATA.CAMEL_SHOULDER_DISHES', avoid: 'CUTS_DATA.CAMEL_SHOULDER_AVOID' },

  { code: 'neck', labelKey: 'CUTS.CAMEL_NECK', sublabelKey: 'CUTS.CAMEL_NECK_SUB', rating: 4, tenderness: 4,
    juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.STRONG', marbling: 'CUTS_DATA.LOW',
    leanness: 'CUTS_DATA.LEAN', bone: true, difficulty: 'CUTS_DATA.MODERATE', price: 'CUTS_DATA.VALUE',
    cooking: 'CUTS_DATA.CAMEL_NECK_COOKING', dishes: 'CUTS_DATA.CAMEL_NECK_DISHES', avoid: 'CUTS_DATA.CAMEL_NECK_AVOID' },

  { code: 'shank', labelKey: 'CUTS.CAMEL_SHANK', sublabelKey: 'CUTS.CAMEL_SHANK_SUB', rating: 4, tenderness: 4,
    juiciness: 'CUTS_DATA.HIGH', flavor: 'CUTS_DATA.STRONG', marbling: 'CUTS_DATA.LOW',
    leanness: 'CUTS_DATA.LEAN', bone: true, difficulty: 'CUTS_DATA.ADVANCED', price: 'CUTS_DATA.VALUE',
    cooking: 'CUTS_DATA.CAMEL_SHANK_COOKING', dishes: 'CUTS_DATA.CAMEL_SHANK_DISHES', avoid: 'CUTS_DATA.CAMEL_SHANK_AVOID' },

  { code: 'ribs', labelKey: 'CUTS.CAMEL_RIBS', sublabelKey: 'CUTS.CAMEL_RIBS_SUB', rating: 4, tenderness: 4,
    juiciness: 'CUTS_DATA.HIGH', flavor: 'CUTS_DATA.STRONG', marbling: 'CUTS_DATA.MEDIUM',
    leanness: 'CUTS_DATA.BALANCED', bone: true, difficulty: 'CUTS_DATA.ADVANCED', price: 'CUTS_DATA.VALUE',
    cooking: 'CUTS_DATA.CAMEL_RIBS_COOKING', dishes: 'CUTS_DATA.CAMEL_RIBS_DISHES', avoid: 'CUTS_DATA.CAMEL_RIBS_AVOID' },

  { code: 'lean', labelKey: 'CUTS.CAMEL_LEAN', sublabelKey: 'CUTS.CAMEL_LEAN_SUB', rating: 4, tenderness: 4,
    juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.MEDIUM', marbling: 'CUTS_DATA.LOW',
    leanness: 'CUTS_DATA.LEAN', bone: false, difficulty: 'CUTS_DATA.MODERATE', price: 'CUTS_DATA.MID',
    cooking: 'CUTS_DATA.CAMEL_LEAN_COOKING', dishes: 'CUTS_DATA.CAMEL_LEAN_DISHES', avoid: 'CUTS_DATA.CAMEL_LEAN_AVOID' },

  { code: 'minced', labelKey: 'CUTS.CAMEL_MINCED', sublabelKey: 'CUTS.CAMEL_MINCED_SUB', rating: 2, tenderness: 2,
    juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.MEDIUM', marbling: 'CUTS_DATA.VARIABLE',
    leanness: 'CUTS_DATA.VARIABLE', bone: false, difficulty: 'CUTS_DATA.EASY', price: 'CUTS_DATA.FLEXIBLE',
    cooking: 'CUTS_DATA.CAMEL_MINCED_COOKING', dishes: 'CUTS_DATA.CAMEL_MINCED_DISHES', avoid: 'CUTS_DATA.CAMEL_MINCED_AVOID' },

  { code: 'fat', labelKey: 'CUTS.CAMEL_FAT', sublabelKey: 'CUTS.CAMEL_FAT_SUB', rating: 1, tenderness: 1,
    juiciness: 'CUTS_DATA.NA', flavor: 'CUTS_DATA.VERY_HIGH', marbling: 'CUTS_DATA.STRONG',
    leanness: 'CUTS_DATA.FATTY', bone: false, difficulty: 'CUTS_DATA.RENDERING', price: 'CUTS_DATA.FLEXIBLE',
    cooking: 'CUTS_DATA.CAMEL_FAT_COOKING', dishes: 'CUTS_DATA.CAMEL_FAT_DISHES', avoid: 'CUTS_DATA.CAMEL_FAT_AVOID' }
],

 chevre: [
  { code: 'avant', labelKey: 'CUTS.GOAT_AVANT', sublabelKey: 'CUTS.GOAT_AVANT_SUB', rating: 3, tenderness: 3,
    juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.STRONG', marbling: 'CUTS_DATA.LOW',
    leanness: 'CUTS_DATA.LEAN', bone: true, difficulty: 'CUTS_DATA.MODERATE', price: 'CUTS_DATA.MID',
    cooking: 'CUTS_DATA.GOAT_AVANT_COOKING', dishes: 'CUTS_DATA.GOAT_AVANT_DISHES', avoid: 'CUTS_DATA.GOAT_AVANT_AVOID' },

  { code: 'arriere', labelKey: 'CUTS.GOAT_ARRIERE', sublabelKey: 'CUTS.GOAT_ARRIERE_SUB', rating: 4, tenderness: 4,
    juiciness: 'CUTS_DATA.MEDIUM', flavor: 'CUTS_DATA.MEDIUM', marbling: 'CUTS_DATA.LOW',
    leanness: 'CUTS_DATA.LEAN', bone: true, difficulty: 'CUTS_DATA.MODERATE', price: 'CUTS_DATA.PREMIUM',
    cooking: 'CUTS_DATA.GOAT_ARRIERE_COOKING', dishes: 'CUTS_DATA.GOAT_ARRIERE_DISHES', avoid: 'CUTS_DATA.GOAT_ARRIERE_AVOID' },

  { code: 'cotelettes', labelKey: 'CUTS.GOAT_COTELETTES', sublabelKey: 'CUTS.GOAT_COTELETTES_SUB', rating: 5, tenderness: 5,
    juiciness: 'CUTS_DATA.HIGH', flavor: 'CUTS_DATA.MEDIUM', marbling: 'CUTS_DATA.MEDIUM',
    leanness: 'CUTS_DATA.BALANCED', bone: true, difficulty: 'CUTS_DATA.EASY', price: 'CUTS_DATA.UPPERMID',
    cooking: 'CUTS_DATA.GOAT_COTELETTES_COOKING', dishes: 'CUTS_DATA.GOAT_COTELETTES_DISHES', avoid: 'CUTS_DATA.GOAT_COTELETTES_AVOID' }
],


};


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService 
  ) {}

ngOnInit(): void {
  this.meatType = this.route.snapshot.paramMap.get('type') || 'beef';
  this.selectedMeat = this.meats.find(m => m.code === this.meatType) || this.meats[0];
  this.cuts = this.MEAT_DATA[this.meatType] || this.MEAT_DATA['beef'];

  if (this.cuts.length > 0) {
    this.selectedCut = this.cuts[0];
  }
   this.orderService.clientName$.subscribe(name => {
      this.customerName = name;
    });
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