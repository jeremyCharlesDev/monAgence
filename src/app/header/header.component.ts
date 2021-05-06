import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'AgenceImmo';
  isAuth = false;

  constructor(private authentificationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (userSession) => {
        if (userSession) {
          console.log('Connecté !!!!!!');
          this.isAuth = true;
        } else {
          console.log('Déconnecté');
          this.isAuth = false;
        }
      }
    );
  }

  onSignOut() {
    this.authentificationService.signOutUser();
    this.router.navigate(['/home']);
  }

}
