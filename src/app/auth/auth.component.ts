import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authStatus!: boolean;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  }

  //callback pour l'événement de click sur le bouton de connexion.
  //authService.signIn() renvoie une promise, d'où le .then
  onSignIn() {
    this.authService.signIn().then(
      () => {
        //signIn() a modifié isAuth à true, on récupère sa valeur
        this.authStatus = this.authService.isAuth;
        console.log("indentification réussie");
        this.router.navigate(["appareils"]);
      }
    )
  }

  onSignOut() {
    this.authService.signOut();
    //signOut() a modifié isAuth à false, on récupère sa valeur
    this.authStatus = this.authService.isAuth;
    console.log("bien déco");
  }
}
