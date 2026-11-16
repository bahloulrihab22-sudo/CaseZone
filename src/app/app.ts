import { Component, signal } from '@angular/core';
import { Commentaire } from './commentaire';
import { Coque } from './coque';
import { CoqueCard } from './components/coque-card/coque-card';
import { CoqueDetail } from './components/coque-detail/coque-detail';
@Component({
  selector: 'app-root',
  imports: [CoqueCard, CoqueDetail],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly title = signal('casezone');
  coqueSelectionnee = signal<Coque | null>(null);

  ajouterAvis(avis: Commentaire) {
    const selection = this.coqueSelectionnee();
    if (!selection) return;
    const miseAJour = { ...selection, comments: [...selection.comments, avis] };
    this.coques.update(coques => coques.map(coque => coque.id === selection.id ? miseAJour : coque));
    this.coqueSelectionnee.set(miseAJour);
  }

  coques = signal<Coque[]>([
    {
      id: '1',
      nom: 'Coque blanche',
      photo: '/images/coque_blanc.jpg',
      prix: 25,
      disponible: true,
      dateAjout: new Date(),
      modele: 'iPhone 15',
      couleur: 'Blanc',
      comments: [
        { nom: 'Sarah', message: 'Très jolie coque, elle protège bien mon téléphone !', note: 5 }
      ]
    },
    {
      id: '2',
      nom: 'Coque bleue',
      photo: '/images/coque_bleu.jpg',
      prix: 30,
      disponible: true,
      dateAjout: new Date(),
      modele: 'Samsung Galaxy S24',
      couleur: 'Bleu',
      comments: []
    },
    {
      id: '3',
      nom: 'Coque rose',
      photo: '/images/coque_ros.jpg',
      prix: 20,
      disponible: false,
      dateAjout: new Date(),
      modele: 'iPhone 14',
      couleur: 'Rose',
      comments: []
    }
  ]);
}
