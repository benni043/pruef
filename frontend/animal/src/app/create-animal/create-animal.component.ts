import { Component } from '@angular/core';
import {AnimalServiceService} from "../animal-service.service";
import {Animal} from "../animal";

@Component({
  selector: 'app-create-animal',
  templateUrl: './create-animal.component.html',
  styleUrls: ['./create-animal.component.css']
})
export class CreateAnimalComponent {

  constructor(private animalService: AnimalServiceService) {
  }

  type: string = "";
  age: number = 0;

  create(): void {
    this.animalService.create({type: this.type, age: this.age} as Animal)
  }

}
