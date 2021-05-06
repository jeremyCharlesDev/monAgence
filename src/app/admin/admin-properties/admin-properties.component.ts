import { PropertiesService } from './../../services/properties.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as $ from 'jquery';
import { Property } from 'src/app/interfaces/property';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {

  propertiesForm: FormGroup;
  propertiesSubscription: Subscription;
  properties: Property[] = [];

  indexToRemove: number;
  indexToUpdate: number;
  editMode = false;

  photoUploading = false;
  photoUploaded = false;
  photosAdded: any[] = [];

  constructor(private formBuilder: FormBuilder, private propertiesService: PropertiesService) { }

  ngOnInit(): void {
    this.initPropertiesForm();
    this.propertiesService.propertiesSubject.subscribe(
      (data: Property[]) => {
        this.properties = data;
      }
    );
    this.propertiesService.getProperties();
    this.propertiesService.emmitProperties();
  }

  initPropertiesForm() {
    this.propertiesForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      surface: ['', Validators.required],
      rooms: ['', Validators.required],
      description: '',
      price: ['', Validators.required],
      sold: '',
    });
  }

  onSubmitPropertiesForm() {
    const newProperty: Property = this.propertiesForm.value;
    // console.log(this.propertiesForm.get('sold').value);
    newProperty.sold = this.propertiesForm.get('sold').value ? this.propertiesForm.get('sold').value : false;
    newProperty.photos = this.photosAdded ? this.photosAdded : [];

    if (this.editMode) {
      this.propertiesService.updateProperty(newProperty, this.indexToUpdate);
    } else {
      this.propertiesService.createProperty(newProperty);
    }
    $('#propertiesFormModal').modal('hide');
  }

  // Méthode Template
  // onSubmitPropertiesForm(form: NgForm) {
  //   console.log(form.value);
  //   const title = form.value['title'];
  // }

  resetForm() {
    this.propertiesForm.reset();
    this.editMode = false;
    this.photosAdded = [];
  }

  onDeleteProperty(index: number) {
    // console.log(this.properties[index]);
    // if(confirm("Êtes-vous sûr de vouloir supprimer ce bien ?")){
    //   this.propertiesService.removeProperty(index);
    // }
    $('#deletePropertyModal').modal('show');
    this.indexToRemove = index;
  }

  onConfirmDeleteProperty() {
    // Suppression de l'image dans le storage
    // if (this.properties[this.indexToRemove].photos && this.properties[this.indexToRemove].photos !== '') {
    //   this.propertiesService.removeFile(this.properties[this.indexToRemove].photos);
    // }
    this.properties[this.indexToRemove].photos.forEach(
      (photo) => {
        this.propertiesService.removeFile(photo);
      }
    );
    this.propertiesService.removeProperty(this.indexToRemove);
    $('#deletePropertyModal').modal('hide');
  }

  onEditProperty(property: Property) {
    this.editMode = true;
    $('#propertiesFormModal').modal('show');
    this.propertiesForm.get('title').setValue(property.title);
    this.propertiesForm.get('category').setValue(property.category);
    this.propertiesForm.get('surface').setValue(property.surface);
    this.propertiesForm.get('rooms').setValue(property.rooms);
    this.propertiesForm.get('description').setValue(property.description ? property.description : '');
    this.propertiesForm.get('price').setValue(property.price);
    this.propertiesForm.get('sold').setValue(property.sold);
    this.photosAdded = property.photos ? property.photos : [];
    // for (const key in property) {
    //     this.propertiesForm.get(key).setValue(property[key]);
    //   // console.log(`${key}: ${property[key]}`);
    // }
    const index = this.properties.findIndex(
      (propertyEl) => {
        if (propertyEl === property) {
          return true;
        }
      }
    );
    this.indexToUpdate = index;
  }

  onUploadFile(event) {
    this.photoUploading = true;
    this.propertiesService.uploadFile(event.target.files[0]).then(
      (url: string) => {
        // if (this.photoUrl && this.photoUrl !== '') {
        //   this.propertiesService.removeFile(this.photoUrl);
        // }
        this.photosAdded.push(url);
        this.photoUploading = false;
        this.photoUploaded = true;
        setTimeout(() => {
          this.photoUploaded = false;
        }, 5000);
      }
    );
  }

  onRemoveAddedPhoto(index) {
    this.propertiesService.removeFile(this.photosAdded[index]);
    this.photosAdded.splice(index, 1);
  }

}
