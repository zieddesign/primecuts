import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutType } from './cut-type';

describe('CutType', () => {
  let component: CutType;
  let fixture: ComponentFixture<CutType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CutType],
    }).compileComponents();

    fixture = TestBed.createComponent(CutType);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
