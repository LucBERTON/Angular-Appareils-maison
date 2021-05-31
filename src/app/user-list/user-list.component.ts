import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/User.model';
import { UserService } from '../services/user.service';


//Compoonent pour gérer la liste des users et pouvoir ajouter un user
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  users!: User[];
  userSubscription!: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    //on souscrit à la liste des users
    this.userSubscription = this.userService.userSubject.subscribe(
      //fonction lambda pour récupérer la liste des users
      (users: User[]) => {
        this.users = users;
      }
    );
    this.userService.emitUsers();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
