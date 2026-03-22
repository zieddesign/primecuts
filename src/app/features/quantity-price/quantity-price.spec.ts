import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityPrice } from './quantity-price';

describe('QuantityPrice', () => {
  let component: QuantityPrice;
  let fixture: ComponentFixture<QuantityPrice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantityPrice],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantityPrice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
