//Service (pour simuler une) authentification
export class AuthService {

    isAuth = false;
  
    //On utilise une Promise pour simuler une asynchronicité sur l'authentification
    signIn() {
      return new Promise(
        (resolve, reject) => {
          setTimeout(
            () => {
              this.isAuth = true;
              resolve(true);
            }, 2000
          );
        }
      );
    }
  
    signOut() {
      this.isAuth = false;
    }
  }