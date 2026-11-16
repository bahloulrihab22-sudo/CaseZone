import { Commentaire } from './commentaire';

export interface Coque {
  id: string;
  nom: string;
  photo: string;
  prix: number;
  disponible: boolean;
  dateAjout: Date;
  modele: string;
  couleur: string;
  comments: Commentaire[];
}