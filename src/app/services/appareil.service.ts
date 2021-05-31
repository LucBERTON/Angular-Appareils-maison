import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

//On déclare le service pour gérer les appareils
@Injectable()
export class AppareilService {
  
  //Subject pour gérer l'array des appareils
  appareilsSubject = new Subject<any[]>();
  
  //rendu private pour qu'il ne soit pas accessible par les aurtes components et service
  //on utilise le Subject pour gérer l'array
  private appareils: any[] = [];

    constructor(private httpClient: HttpClient) {}

    //méthode pour enregistrer les appareils sur le serveur (base firebase)
    saveAppareilsToServer() {
      this.httpClient
        .put('https://http-client-demo-angular-b1c44-default-rtdb.firebaseio.com/appareils.json', this.appareils)
        //retourne un Observable, on peut donc y souscrire
        .subscribe(
          //fonciton lambda dans le cas où pas d'erreur
          () => {
            console.log('Enregistremement OK');
          },
          //fonction lambda pour les erreurs
          (error) => {
            console.log('Erreur lors de l\'enregistrement' + error);
          }
        );
    }

    //méthode pour récupérer les données de la base firebase
    getAppareilsFromServer() {
      this.httpClient
      //On précise <any[]> sinon typescript renvoie une erreur 
      .get<any[]>('https://http-client-demo-angular-b1c44-default-rtdb.firebaseio.com/appareils.json')
      //la méthode get() retourne un observable, on peut donc y souscrire
      .subscribe(
        //fonction lambda pour gérer la réponse de la base
        (response) => {
          this.appareils = response;
          this.emitAppareilSubject();
        },
        //fonction lambda pour gérer les erreurs
        (error) => {
          console.log('Erreur lors de la récupération des données ' + error);
        }
      );
    }


    //permet d'émettre les données lors de la réception de donénes par le Subject
    //note : slice() pour envoyer une shallow copy d'un array
    emitAppareilSubject() {
      this.appareilsSubject.next(this.appareils.slice());
    }

    addAppareils(name: string, status: string) {
      //on créé une ébauche d'appareilObject
      const appareilObject = {
        id: 0,
        name : '',
        status: false
      };
            
      //On ajoute les valeurs récupérées dans l'objet
      //on calcule l'id de l'appareil à ajouter
      const nextId = this.appareils.length +1;
      appareilObject.id = nextId;
      appareilObject.name = name;
      //on parse le status car on récupère un string et on veut un booléen
      appareilObject.status = JSON.parse(status);

      //On ajoute le nouvel objet à l'array
      this.appareils.push(appareilObject);

      //on émet l'objet pour tout garder à jour partout
      this.emitAppareilSubject();
    }

    switchOnAll() {
        for (let appareil of this.appareils) {
            appareil.status = true;
        }
        this.emitAppareilSubject();
    }

    switchOffAll() {
        for (let appareil of this.appareils) {
            appareil.status = false;
        }
        this.emitAppareilSubject();
    }

    switchOnOne(i: number) {
        this.appareils[i].status = true;
        this.emitAppareilSubject();
    }

    switchOffOne(i: number) {
      this.appareils[i].status = false;
      this.emitAppareilSubject();
    }

    //renvoie l'appareil en fonction de son id
    getAppareilById(id: number) {
      const appareil = this.appareils.find(
        (appareilObject) => {
          return appareilObject.id === id;
        }
      );
      return appareil;
    }
}