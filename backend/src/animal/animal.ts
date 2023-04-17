export type Animal = {
    type: string,
    age: number,
    id: number,
}

export interface AnimalStoreInterface {
    findAll(): Promise<Animal[]>;

    find(id: number): Promise<Animal>;

    delete(id: number): Promise<void>;

    change(id: number, animal: Animal): Promise<void>;

    create(animal: Animal): Promise<number>;
}