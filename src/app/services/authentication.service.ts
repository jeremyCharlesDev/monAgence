import firebase from 'firebase';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          (data) => {
            resolve(data);
          }
        ).catch(
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  // signUpUser(email: string, password: string) {
  //   return new Promise(
  //     (resolve, reject) => {
  //       firebase.auth().createUserWithEmailAndPassword(email, password).then(
  //         () => {
  //           resolve('Vous êtes connecté');
  //         }
  //       ).catch(
  //         (error) => {
  //           reject(error);
  //         }
  //       );
  //     }
  //   );
  // }

  signOutUser() {
    firebase.auth().signOut();
  }




}
