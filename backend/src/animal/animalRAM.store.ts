import {Animal, AnimalStoreInterface} from "./animal";

export class AnimalRAMStore implements AnimalStoreInterface {

    animals: Animal[] = [];
    id: number = 0;

    async change(id: number, animal: Animal): Promise<void> {
        this.animals[this.getIndexFromID(id)] = animal;
    }

    async create(animal: Animal): Promise<number> {
        animal.id = this.id;
        this.animals.push(animal);
        this.id++;

        return animal.id;
    }

    async delete(id: number): Promise<void> {
        this.animals.splice(this.getIndexFromID(id), 1);
    }

    async find(id: number): Promise<Animal> {
        return this.animals[this.getIndexFromID(id)];
    }

    async findAll(): Promise<Animal[]> {
        return this.animals;
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