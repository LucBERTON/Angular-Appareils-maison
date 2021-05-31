import { Subject } from "rxjs";
import { User } from "../models/User.model";

//service pour gérer la liste des utilisateurs
export class UserService {
    //on déclare une première valeur de user pour avoir des données à afficher dans user list component
    private users: User[] = [
        new User("Luc", "B", "luc.b@test.com", "chats", ["JavaScript","Zététique"]),
        new User("Jiji", "Lechat", "jiji.lechat@test.com", "chats", ["croquettes","panier"])
        ];

    //pour que la liste puisse être observée et émise
    userSubject = new Subject<User[]>();

    //on émet la liste à jour
    emitUsers() {
        this.userSubject.next(this.users.slice());
    }

    addUser(user: User) {
        //on ajoute le nouvel user à la liste
        this.users.push(user);
        this.emitUsers();
    }

}