import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Animal} from "./animal";

@Injectable({
  providedIn: 'root'
})
export class AnimalServiceService {

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<Animal[]>("http://localhost:3000/api/animal/").subscribe(
      {
        next: res => {
          this.animals = res;
          console.log(res)
        },
        error: () => {
          alert("Konnte keine Tiere finden!")
        }
      }
    )
  }

  animals: Animal[] = [];

  delete(id: number) {
    this.httpClient.delete<void>("http://localhost:3000/api/animal/" + id).subscribe(
      {
        next: res => {
          this.animals.splice(this.getIndexFromID(id), 1)
        },
        error: err => {
          alert("Fehler beim löschen!")
        }
      }
    )
  }

  change(id: number, animal: Animal) {
    this.httpClient.put<void>("http://localhost:3000/api/animal/" + id, animal).subscribe(
      {
        next: res => {
          this.animals[this.getIndexFromID(id)] = animal;
        },
        error: err => {
          switch (err.status) {
            case 400: {
              alert("Fehler beim ändern!");
              break;
            }
          }
        }
      }
    )
  }

  create(animal: Animal): void {
    this.httpClient.post<number>("http://localhost:3000/api/animal/", animal).subscribe(
      {
        next: res => {
          animal.id = res;
          this.animals.push(animal);
        },
        error: err => {
          alert("Fehler beim ändern!")
        }
      }
    )
  }

  getIndexFromID(id: number): number {
    for (let i = 0; i < this.animals.length; i++) {
      if (this.animals[i].id == id) {
        return i;
      }
    }

    throw new Error();
  }

}
