import {Component, Input, OnInit} from '@angular/core';
import {AnimalServiceService} from "../animal-service.service";
import {Animal} from "../animal";

@Component({
  selector: 'app-list-animal',
  templateUrl: './list-animal.component.html',
  styleUrls: ['./list-animal.component.css']
})
export class ListAnimalComponent implements OnInit{

  constructor(private animalService: AnimalServiceService) {
  }

  @Input() animal!: Animal;

  newType: string = "";
  newAge: number = 0;

  change(): void {
    this.animalService.change(this.animal.id, {type: this.newType, age: this.newAge, id: this.animal.id} as Animal);
  }

  delete(): void {
    this.animalService.delete(this.animal.id);
  }

  ngOnInit(): void {
    this.newType = this.animal.type;
    this.newAge = this.animal.age;
  }

}
