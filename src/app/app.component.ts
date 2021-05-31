import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Subscription } from 'rxjs';

//décorateur pour Angular:
//selector : nom de l'élément HTML
//templateURL : nom du fichier template HTML
//styleUrls : liste des stylesheets à utiliser (vide ici, on utilise que bootstrap)
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  
  secondes!: number;
  counterSubscription!: Subscription;

  constructor() {}

  ngOnInit() {
    //On créé une Observable pour le temps de connexion
    const counter = Observable.interval(1000);

    //On souscrit à l'Observable
    this.counterSubscription = counter.subscribe(
      //fonction qui renvoit les données
      (value) => {
        this.secondes = value;
      },
      //fonction d'erreur
      (error) => {
        console.log('une erreur inatendue! ' + error);
      },
      //fonction complete
      () => {
        console.log("Observable terminé!")
      }
    );
  }

  //méthode pour gérer un clean-up personnalisé. On se désinscrit de l'observable
  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }
}
