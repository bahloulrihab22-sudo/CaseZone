import { Component,input } from '@angular/core';
import { Coque } from '../../coque';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-coque-card',
  imports: [DatePipe],
  templateUrl: './coque-card.html',
  styleUrl: './coque-card.css',
})
export class CoqueCard {
  coque = input.required<Coque>();
}
