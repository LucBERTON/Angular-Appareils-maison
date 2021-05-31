import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppareilService } from '../services/appareil.service';


/*
Ce Component sert d'illustration pour gérer un formulaire utilisateur via la méthode Template
*/

@Component({
  selector: 'app-edit-appareil',
  templateUrl: './edit-appareil.component.html',
  styleUrls: ['./edit-appareil.component.scss']
})
export class EditAppareilComponent implements OnInit {

  defaultStatus = false;

  constructor(private appareilService: AppareilService,
              private router: Router) { }

  ngOnInit(): void {
  }

  //fonction callback du formulaire de création d'appareil 
  onSubmit(form: NgForm) {
    //on récupère les données renseignées par l'utilisateur
    const name = form.value['name'];
    const status = form.value['status'];

    //on appelle la fonction de création d'appareil du AppareilService
    this.appareilService.addAppareils(name, status);

    //on renvoit l'utilisateur vers la liste des appareils à jour
    this.router.navigate(['/appareils']);
  }
}
