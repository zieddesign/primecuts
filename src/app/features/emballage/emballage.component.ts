import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../shared/header/header';
import { OrderService } from '../../shared/services/order.service';
import { AdvisorService } from '../../shared/services/advisor.service';

export interface PackagingOption {
  id: string;
  nameKey: string;
  nameArKey: string;
  descKey: string;
  selected: boolean;
}

@Component({
  selector: 'app-emballage',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, HeaderComponent],
  templateUrl: './emballage.component.html',
  styleUrls: ['./emballage.component.scss'],
})
export class EmballageComponent implements OnInit {

  // ── Params route ──────────────────────────────────────────
  meatType = '';
  part = '';
  cutType = '';
  size = '';       // subOption ex: 'c2', 's2'
  quantity = 1;

  cartCount = signal<number>(0);
  customerName: string = ''
  packagingOptions = signal<PackagingOption[]>([
    {
      id: 'carton',
      nameKey: 'EMBALLAGE.CARTON_NAME',
      nameArKey: 'EMBALLAGE.CARTON_NAME_AR',
      descKey: 'EMBALLAGE.CARTON_DESC',
      selected: true,
    },
    {
      id: 'sachet',
      nameKey: 'EMBALLAGE.SACHET_NAME',
      nameArKey: 'EMBALLAGE.SACHET_NAME_AR',
      descKey: 'EMBALLAGE.SACHET_DESC',
      selected: false,
    },
  ]);

  selectedPackaging = computed(
    () => this.packagingOptions().find(p => p.selected) ?? this.packagingOptions()[0]
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    public advisorService: AdvisorService
  ) {
    const type = this.route.snapshot.paramMap.get('type');
    const size = this.route.snapshot.paramMap.get('size');
    const quantity = this.route.snapshot.paramMap.get('quantity');
  }

  ngOnInit(): void {
    const p = this.route.snapshot.params;
    this.meatType = p['type'] || '';
    this.part = p['part'] || '';
    this.cutType = p['cutType'] || '';
    this.size = p['size'] || '';
    this.quantity = +p['quantity'] || 1;

    this.cartCount.set(this.orderService.count);
    this.orderService.clientName$.subscribe(name => {
      this.customerName = name;
    });
  }

  selectPackaging(id: string): void {
    this.packagingOptions.update(opts =>
      opts.map(o => ({ ...o, selected: o.id === id }))
    );
  }

  onPrev(): void {
    if (this.size) {
      this.router.navigate([
        '/quantity-price', this.meatType, this.part, this.cutType, this.size,
      ]);
    } else {
      this.router.navigate([
        '/quantity-price', this.meatType, this.part, this.cutType,
      ]);
    }
  }

 
  onAddToCart(): void {
    const items = this.orderService.getItems();

    if (items.length > 0) {
      const lastItem = items[items.length - 1];

      lastItem.packaging = this.selectedPackaging().id;

    }


    this.router.navigate(['/another-cut']);
  }

  trackByOption(_: number, opt: PackagingOption): string {
    return opt.id;
  }

  getMeatKey(): string { return 'MEAT.' + this.meatType.toUpperCase(); }
  getPartKey(): string { return 'CUTS.' + this.part.toUpperCase(); }
  getCutKey(): string { return 'CUT_TYPE.' + this.cutType.toUpperCase(); }
}