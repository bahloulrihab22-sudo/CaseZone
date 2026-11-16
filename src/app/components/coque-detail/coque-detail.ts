import { Component, input } from '@angular/core';
import { Coque } from '../../coque';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-coque-detail',
  imports: [DatePipe],
  templateUrl: './coque-detail.html',
  styleUrl: './coque-detail.css'
})
export class CoqueDetail {
  coque = input.required<Coque>();
}