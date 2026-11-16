import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Coque } from './coque';
import { CoqueCard } from './components/coque-card/coque-card';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CoqueCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('casezone');

  protected coques = signal<Coque[]>([
    {
      id: '1',
      nom: 'Coque blanche',
      photo: '/images/coque_blanc.jpg',
      prix: 25,
      disponible: true,
      dateAjout: new Date(),
      modele: 'iPhone 15',
      couleur: 'Blanc',
      comments: []
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