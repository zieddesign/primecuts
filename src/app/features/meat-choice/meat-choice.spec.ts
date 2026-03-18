import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeatChoiceComponent } from './meat-choice';

describe('MeatChoiceComponent', () => {
  let component: MeatChoiceComponent;
  let fixture: ComponentFixture<MeatChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeatChoiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MeatChoiceComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
