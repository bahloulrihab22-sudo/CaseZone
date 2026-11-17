# CaseZone : acces HTTP (cours 13)

## Lancement

Installer les dependances : `npm install`.

Terminal 1 : `npm run server` (API sur http://localhost:3000/coques).
Terminal 2 : `npm start` (application sur http://localhost:4200).
Les deux terminaux doivent rester ouverts.

## Fonctionnement

- `bd.json` contient les trois coques et leurs commentaires.
- `provideHttpClient()` active HttpClient dans `app.config.ts`.
- `CoqueService.getCoques()` execute GET /coques et met a jour le signal avec `tap`.
- `App.ngOnInit()` appelle le service et `subscribe()` declenche la requete.
- Un avis est ajoute au tableau comments de la coque, puis `updateCoque()` envoie PUT /coques/:id.
- Apres succes, le signal est actualise avec la reponse du serveur et les champs sont vides.
- En cas d'erreur, un message apparait et la saisie reste disponible pour reessayer.
- Les boutons sont desactives pendant l'enregistrement pour eviter les doubles envois.
- JSON Server enregistre les modifications dans bd.json : elles restent apres rechargement.
- Les dates sont des chaines ISO (JSON ne contient pas d'objets Date). DatePipe les affiche comme avant.

Les donnees initiales utilisent le 16/11/2026, date de migration des anciennes valeurs new Date().
Les commentaires restent imbriques dans les coques : PUT remplace la coque complete.
Cette API locale est un serveur de test, comme dans le cours, sans gestion des modifications simultanees.

Le cours montre @Service ; le projet Angular utilise le decorateur disponible @Injectable({ providedIn: 'root' }).
L'installation de JSON Server est locale au projet pour permettre `npm run server`.
On utilise GET et PUT, necessaires a cette interface ; aucun bouton de suppression ou d'ajout de produits n'est ajoute.

## Verification

`npm run build`
`npm test -- --watch=false`

Verifier aussi : ouvrir une coque, ajouter un avis, recharger et rouvrir la coque.
Arreter l'API : une tentative d'ajout doit afficher une erreur et conserver la saisie.
