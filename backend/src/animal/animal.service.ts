import {Animal, AnimalStoreInterface} from "./animal";
import {AnimalRAMStore} from "./animalRAM.store";

export class AnimalService {
    private animalStore: AnimalStoreInterface;

    constructor() {
        this.animalStore = new AnimalRAMStore();
    }

    async change(id: number, animal: Animal): Promise<void> {
        if (animal.type == "" || animal.age < 0) {
            throw new Error("invalid");
        }
        if (await this.animalStore.find(id) == undefined) throw new Error("invalid");

        await this.animalStore.change(id, animal);
    }

    async delete(id: number): Promise<void> {
        if (await this.animalStore.find(id) == undefined) throw new Error("invalid");

        await this.animalStore.delete(id);
    }

    async findAll(): Promise<Animal[]> {
        return await this.animalStore.findAll();
    }

    async find(id: number): Promise<Animal> {
        let animal = await  this.animalStore.find(id);
        if (await animal == undefined) throw new Error("invalid");

        return animal;
    }

    async create(animal: Animal): Promise<number> {
        if (animal.type == "" || animal.age < 0) throw new Error("invalid");

        return this.animalStore.create(animal);
    }

}