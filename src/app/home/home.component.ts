import { Router } from '@angular/router';
import { PropertiesService } from './../services/properties.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  title = 'monAgence';

  dateNow = new Date();

  properties = [];
  propertiesSubscripion: Subscription;

  constructor(private propertiesService: PropertiesService, private router: Router) { }

  ngOnInit(): void {

    // AVEC LES PROMISES
    // this.propertiesService.getProperties().then(
    //   (data: any[]) => {
    //     this.properties = data;
    //   }
    // ).catch(
    //   (error) => {
    //     console.log(error);
    //   }
    // );

    this.propertiesSubscripion = this.propertiesService.propertiesSubject.subscribe(
      (data: any) => {
        this.properties = data;
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('Observable complete!');
      }
    );
    this.propertiesService.getProperties();
    this.propertiesService.emmitProperties();
  }

  ngOnDestroy(): void {
    this.propertiesSubscripion.unsubscribe();
  }

  getSoldValue(i: number) {
    return this.properties[i].sold ? 'red' : 'green';
  }

}
