//on créé un modèle pour les utilisateurs.
//Utile pour le formulaire de création de nouvel utilisateur.

export class User {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public animalPreference: string,

        //? car il peut ne pas y en avoir. string[] car ca sera un array de strings.
        public hobbies?: string[]
    ) {}
}