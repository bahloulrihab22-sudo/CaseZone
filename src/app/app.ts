import { Component, inject, OnInit, signal } from '@angular/core';
import { Commentaire } from './commentaire';
import { Coque } from './coque';
import { CoqueService } from './coque.service';
import { CoqueCard } from './components/coque-card/coque-card';
import { CoqueDetail } from './components/coque-detail/coque-detail';

@Component({
  selector: 'app-root',
  imports: [CoqueCard, CoqueDetail],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  readonly title = signal('casezone');
  coqueService = inject(CoqueService);
  coques = this.coqueService.coques;
  coqueSelectionnee = signal<Coque | null>(null);
  chargement = signal(false);
  enregistrement = signal(false);
  erreur = signal('');

  ngOnInit(): void {
    this.chargerCoques();
  }

  chargerCoques() {
    this.chargement.set(true);
    this.erreur.set('');
    this.coqueService.getCoques().subscribe({
      next: () => this.chargement.set(false),
      error: () => {
        this.chargement.set(false);
        this.erreur.set('Impossible de charger les coques. Vérifie que le serveur est démarré, puis réessaie.');
      }
    });
  }

  ajouterAvis(avis: Commentaire) {
    const selection = this.coqueSelectionnee();
    if (!selection || this.enregistrement()) return;
    const miseAJour = { ...selection, comments: [...selection.comments, avis] };
    this.enregistrement.set(true);
    this.erreur.set('');
    this.coqueService.updateCoque(miseAJour).subscribe({
      next: coque => {
        this.coqueSelectionnee.set(coque);
        this.enregistrement.set(false);
      },
      error: () => {
        this.enregistrement.set(false);
        this.erreur.set('Avis non enregistré. Vérifie le serveur et réessaie : ta saisie est conservée.');
      }
    });
  }
}
