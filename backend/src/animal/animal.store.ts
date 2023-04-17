import {Animal, AnimalStoreInterface} from "./animal";
import {Int, VarChar} from "mssql";
import {DBPool} from "./dbPool";

export class AnimalStore implements AnimalStoreInterface {

    connectionPool = DBPool.getInstance();

    async change(id: number, animal: Animal): Promise<void> {
        try {
            await this.connectionPool.request()
                .input('id', Int, animal.id)
                .input('type', VarChar, animal.type)
                .input('age', Int, animal.age)
                .query('UPDATE product SET type= @type, age= @age WHERE id= @id');
        } catch (e) {
            console.log(e);
            throw new Error("failed to update the animal with id=" + animal.id);
        }
    }

    async create(animal: Animal): Promise<number> {
        try {
            let result = await this.connectionPool.request()
                .input('type', VarChar, animal.type)
                .input('age', Int, animal.age)
                .query('INSERT INTO ANIMAL (TYPE, AGE) VALUES (@type, @age); SELECT SCOPE_IDENTITY() AS id');
            return result.recordset[0].id;
        } catch (e) {
            console.log(e);
            throw new Error("failed to create the animal with");
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await this.connectionPool.request()
                .input('id', Int, id)
                .query('DELETE FROM animal WHERE id= @id');
        } catch (e) {
            console.log(e);
            throw new Error("failed to delete the animal with id=" + id);
        }
    }

    async findAll(): Promise<Animal[]> {
        try {
            let result1 = await this.connectionPool.request()
                .query<Animal>('select id, type, age from animal')
            return result1.recordset;
        } catch (e) {
            console.log(e);
            throw new Error("failed to get the animals");
        }
    }

    async find(id: number): Promise<Animal> {
        try {
            let result1 = await this.connectionPool.request()
                .input('input_parameter', Int, id)
                .query<Animal>('select id, type, age from animal where id = @input_parameter')
            return result1.recordset[0];
        } catch (e) {
            console.log(e);
            throw new Error("failed to get the animal with id= " + id);
        }
    }

}