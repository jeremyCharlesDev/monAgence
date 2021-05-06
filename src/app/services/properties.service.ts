import { Property } from './../interfaces/property';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  // properties = [
  //   {
  //     title: 'Ma super maison',
  //     category: 'Maison',
  //     surface: '75',
  //     price: '300 000',
  //     sold: true
  //   },
  //   {
  //     title: 'Petit appartement',
  //     category: 'Appartement',
  //     surface: '66',
  //     sold: false
  //   },
  //   {
  //     title: 'Belle villa',
  //     category: 'Maison',
  //     surface: '150',
  //     sold: true
  //   },
  // ];

  properties: Property[] = [];
  propertiesSubject = new Subject<Property[]>();


  constructor() { }

  emmitProperties() {
    this.propertiesSubject.next(this.properties);
  }

  saveProperties() {
    firebase.database().ref('/properties').set(this.properties);
  }

  getProperties() {
    firebase.database().ref('/properties').on('value', (data) => {
      this.properties = data.val() ? data.val() : [];
      this.emmitProperties();
    });
  }

  getSingleProperties(id) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/properties/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }
        ).catch(
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createProperty(property: Property) {
    this.properties.push(property);
    this.saveProperties();
    this.emmitProperties();
  }

  removeProperty(index: number) {
    this.properties.splice(index, 1);
    this.saveProperties();
    this.emmitProperties();
  }

  updateProperty(property: Property, index: number) {
    // this.properties[index] = property;
    // this.saveProperties();
    // this.emmitProperties();
    firebase.database().ref('/properties/' + index).update(property).catch(
      (error) => {
        console.error(error);
      }
    );
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const uniqueId = Date.now().toString();
        const fileName = uniqueId + '-' + file.name;
        const upload = firebase.storage().ref().child('images/properties/' + fileName).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement...');
          },
          (error) => {
            console.log(error);
            reject(error);
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then(
              (downLoadUrl) => {
                resolve(downLoadUrl);
              }
            );
          }
        );
      }
    );
  }

  removeFile(fileLink: string) {
    if (fileLink) {
      const storageRef = firebase.storage().refFromURL(fileLink);
      storageRef.delete().then(
        () => {
          console.log('File deleted');
        }
      ).catch(
        (error) => {
          console.error(error);
        }
      );
    }
    return new Promise(
      (resolve, reject) => {
        const storageRef = firebase.storage().refFromURL(fileLink);
        storageRef.delete().then(
        () => {
          console.log('File deleted');
          resolve('Le fichier à été supprimé');
        }
      );
      }
    );
  }


  // Exemple (pas besoin avec les observables)

  // getProperties() {
  //   //PROMISE
  //   // return new Promise(
  //   //   (resolve, reject) => {
  //   //     if(this.properties && this.properties.length > 0 ){
  //   //       resolve(this.properties);
  //   //     } else {
  //   //       const error = new Error('Properties does not exist or is empty');
  //   //       reject(error);
  //   //     }
  //   // })

  //   // OBSERVABLE
  //   // return new Observable((observer) => {
  //   //   if(this.properties && this.properties.length > 0 ){
  //   //     observer.next(this.propertiesSubject);
  //   //     observer.complete();
  //   //   } else {
  //   //     const error = new Error('Properties does not exist or is empty');
  //   //     observer.error(error);
  //   //   }
  //   // })
  // }
}
