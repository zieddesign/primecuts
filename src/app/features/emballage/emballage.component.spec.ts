import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmballageComponent } from './emballage.component';

describe('Emballage', () => {
  let component: EmballageComponent;
  let fixture: ComponentFixture<EmballageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmballageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmballageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
