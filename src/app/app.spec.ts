import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from './app';
import { Coque } from './coque';

const coque: Coque = { id: '1', nom: 'Coque blanche', photo: '/images/coque_blanc.jpg', prix: 25, disponible: true, dateAjout: '2026-11-16', modele: 'iPhone 15', couleur: 'Blanc', comments: [] };
const url = 'http://localhost:3000/coques';

describe('App HTTP', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [App], providers: [provideHttpClient(), provideHttpClientTesting()]
  }));
  afterEach(() => TestBed.inject(HttpTestingController).verify());

  function demarrer() {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const http = TestBed.inject(HttpTestingController);
    const requete = http.expectOne(url);
    expect(requete.request.method).toBe('GET');
    return { fixture, app: fixture.componentInstance, http, requete };
  }

  it('charge le catalogue depuis HTTP', () => {
    const { fixture, app, requete } = demarrer();
    requete.flush([coque]);
    fixture.detectChanges();
    expect(app.coques()).toEqual([coque]);
    expect(fixture.nativeElement.textContent).toContain('Coque blanche');
    expect(app.chargement()).toBe(false);
  });

  it('met a jour les avis seulement apres la confirmation PUT', () => {
    const { app, http, requete } = demarrer();
    requete.flush([coque]);
    app.coqueSelectionnee.set(coque);
    const avis = { nom: 'Ali', message: 'Belle coque', note: 5 };
    app.ajouterAvis(avis);
    app.ajouterAvis(avis);
    expect(app.coqueSelectionnee()?.comments).toEqual([]);
    const put = http.expectOne(url + '/1');
    expect(put.request.method).toBe('PUT');
    expect(put.request.body.comments).toEqual([avis]);
    put.flush({ ...coque, comments: [avis] });
    expect(app.coques()[0].comments).toEqual([avis]);
    expect(app.coqueSelectionnee()?.comments).toEqual([avis]);
    expect(app.enregistrement()).toBe(false);
  });

  it('signale une erreur de chargement et permet de reessayer', () => {
    const { app, http, requete } = demarrer();
    requete.flush('indisponible', { status: 500, statusText: 'Server Error' });
    expect(app.erreur()).not.toBe('');
    expect(app.chargement()).toBe(false);
    app.chargerCoques();
    http.expectOne(url).flush([coque]);
    expect(app.erreur()).toBe('');
  });

  it('conserve la saisie si le serveur refuse un avis', () => {
    const { fixture, app, http, requete } = demarrer();
    requete.flush([coque]);
    app.coqueSelectionnee.set(coque);
    fixture.detectChanges();
    const nom = fixture.nativeElement.querySelector('#nom') as HTMLInputElement;
    const message = fixture.nativeElement.querySelector('#message') as HTMLTextAreaElement;
    nom.value = 'Ali'; nom.dispatchEvent(new Event('input'));
    message.value = 'Belle coque'; message.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.nativeElement.querySelector('fieldset button').click();
    http.expectOne(url + '/1').flush('indisponible', { status: 500, statusText: 'Server Error' });
    fixture.detectChanges();
    expect(nom.value).toBe('Ali');
    expect(message.value).toBe('Belle coque');
    expect(app.coques()[0].comments).toEqual([]);
    expect(app.enregistrement()).toBe(false);
  });
});
