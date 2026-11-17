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
    fixture.componentRef.setInput('coque', { id: '1', nom: 'Coque blanche', photo: '', prix: 25, disponible: true, dateAjout: '2026-11-16', modele: 'iPhone 15', couleur: 'Blanc', comments: [] });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
