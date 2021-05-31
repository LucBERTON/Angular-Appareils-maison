import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User.model';
import { UserService } from '../services/user.service';


//Component pour créer un nouvel utilisateur
//Ce Component sert d'illustration pour gérer un formulaire utilisateur via la méthode Réactive
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      animalPreference: ['',Validators.required],
      hobbies: this.formBuilder.array([])
    });
  }

  onSubmitForm() {
    //On récupère les valeurs du formulaire
    const formValue = this.userForm.value;

    //On crée un nouvel objet User avec les valeurs récupérées
    const newUser = new User(
      formValue['firstName'],
      formValue['lastName'],
      formValue['email'],
      formValue['animalPreference'],

      //si hobbies est présent, on récupère la valeur, sinon on récupère un array vide à la place
      formValue['hobbies'] ? formValue['hobbies']: []
    );

    //on ajoute le nouvel User à la liste des users
    this.userService.addUser(newUser);

    //on navigue l'utilisateur vers la liste des users
    this.router.navigate(['/users']);
  }

  //méthode pour récupérer les hobbies sous forme de FormArray (pour ajout de control dans le formulaire)
  getHobbies(): FormArray {
    return this.userForm.get('hobbies') as FormArray;
  }

  //callback pour répondre à l'événement de clic d'ajout d'un hobby
  onAddHobby() {
    //on créé un nouveau control sur le formulaire pour les hobbies, et on le rend requis.
    const newHobbyControl = this.formBuilder.control(null, Validators.required);

    //on ajoute le nouveau control à l'array des hobbies
    this.getHobbies().push(newHobbyControl);
  }

}
