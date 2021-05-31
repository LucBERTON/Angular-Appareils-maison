import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppareilService } from '../services/appareil.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})

//on déclare la classe et elle implémente l'interface OnInit (utile pour faire fonctionner les services)
export class AppareilViewComponent implements OnInit, OnDestroy {

  //le ! à la fin car sinon Angular renvoie une erreur car la valeur n'est pas initialisée
  appareils!: any[];
  isAuth = false;
  
  //Pour souscrire au Subject qui gère les appareils
  appareilSubscription!: Subscription;

  //id pour l'URL de la vue dédiée à un appareil
  @Input() id!: number;

  
  //on utilise une Promis pour simuler un traitement asynchrone
  lastUpdate = new Promise<Date>((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });
  



  //On doit indiquer les services qui sont utilisés par cette classe dans le constructeur
  constructor(private appareilService: AppareilService,
              private authService: AuthService) { }

  

  //méthode "lifecycle hook" pour Angular. Elle est exécutée au moment de la création du component, après le constructeur
  ngOnInit() {
      //on souscrit à l'array des appareils
      this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
        (appareils: any[]) => {
          this.appareils = appareils;
        }
      );
      this.appareilService.emitAppareilSubject();
  }

  //callback pour répondre au click du bouton tout allumer
  onAllumer() {
    this.appareilService.switchOnAll();
  }
  //callback pour répondre au click du bouton tout éteindre
  onEteindre() {
    if (confirm('Etes-vous sur de vouloir tout éteindre?')) {
      this.appareilService.switchOffAll();
    }
  }

  //callback pour répondre au click de l'enregistrement serveur
  onSave() {
    this.appareilService.saveAppareilsToServer();
  }

  //callback pour la récupération des données serveur
  onFetch() {
    this.appareilService.getAppareilsFromServer();
  }

  ngOnDestroy() {
    //on désouscrit au Subject des appareils
    this.appareilSubscription.unsubscribe();
  }



}
