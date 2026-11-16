import { Component, input, output } from '@angular/core';
import { Coque } from '../../coque';
@Component({
  selector: 'app-coque-card',
  imports: [],
  templateUrl: './coque-card.html',
  styleUrl: './coque-card.css',
})
export class CoqueCard {
  coque = input.required<Coque>();
  decouvrir = output<Coque>();
}
