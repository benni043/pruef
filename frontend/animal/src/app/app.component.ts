import { Component } from '@angular/core';
import {AnimalServiceService} from "./animal-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public animalService: AnimalServiceService) {
  }

}
