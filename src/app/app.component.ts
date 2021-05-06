import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor() {
      const firebaseConfig = {
        apiKey: 'AIzaSyC3Z8ihICXnq-yA_Hp9zQdNbhOfjyIKleo',
        authDomain: 'monagence-17a98.firebaseapp.com',
        databaseURL: 'https://monagence-17a98-default-rtdb.europe-west1.firebasedatabase.app',
        projectId: 'monagence-17a98',
        storageBucket: 'monagence-17a98.appspot.com',
        messagingSenderId: '561470870968',
        appId: '1:561470870968:web:3185ad05615a5bb9c52b4d'
      };
      firebase.initializeApp(firebaseConfig);
    }
}
