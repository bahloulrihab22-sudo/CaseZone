import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoqueDetail } from './coque-detail';

describe('CoqueDetail', () => {
  let component: CoqueDetail;
  let fixture: ComponentFixture<CoqueDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoqueDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(CoqueDetail);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('coque', { id: '1', nom: 'Coque blanche', photo: '', prix: 25, disponible: true, dateAjout: '2026-11-16', modele: 'iPhone 15', couleur: 'Blanc', comments: [] });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
