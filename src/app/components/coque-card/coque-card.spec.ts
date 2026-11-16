import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoqueCard } from './coque-card';

describe('CoqueCard', () => {
  let component: CoqueCard;
  let fixture: ComponentFixture<CoqueCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoqueCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CoqueCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
