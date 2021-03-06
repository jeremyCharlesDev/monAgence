import { Property } from 'src/app/interfaces/property';
import { PropertiesService } from './../services/properties.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-property',
  templateUrl: './single-property.component.html',
  styleUrls: ['./single-property.component.css']
})
export class SinglePropertyComponent implements OnInit {

  property: Property;

  constructor(private route: ActivatedRoute, private propertiesService: PropertiesService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // const id = this.route.snapshot.params['id'];
    this.propertiesService.getSingleProperties(id).then(
      (property: Property) => {
        this.property = property;
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );

  }

}
