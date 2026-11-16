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
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
