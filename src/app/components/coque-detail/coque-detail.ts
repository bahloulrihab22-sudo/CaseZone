import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Commentaire } from '../../commentaire';
import { Coque } from '../../coque';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-coque-detail',
  imports: [DatePipe, FormsModule],
  templateUrl: './coque-detail.html',
  styleUrl: './coque-detail.css'
})
export class CoqueDetail {
  coque = input.required<Coque>();
  retour = output<void>();
  avisAjoute = output<Commentaire>();
  nom = '';
  note = 5;
  message = '';

  avisValide(): boolean {
    return this.nom.trim().length > 0 && this.nom.length <= 80
      && this.message.trim().length > 0 && this.message.length <= 2000
      && this.note >= 1 && this.note <= 5 && this.note % 1 === 0;
  }

  publierAvis() {
    if (!this.avisValide()) return;
    this.avisAjoute.emit({ nom: this.nom.trim(), note: this.note, message: this.message.trim() });
    this.nom = '';
    this.note = 5;
    this.message = '';
  }
}
