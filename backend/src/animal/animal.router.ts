import {Router} from "express";
import {AnimalService} from "./animal.service";
import {Animal} from "./animal";

export class AnimalRouter {
    private readonly animalService: AnimalService;
    private readonly _router: Router;

    constructor() {
        this.animalService = new AnimalService();
        this._router = Router();

        this.router.get("/", async (req, res) => {
            try {
                const animals: Animal[] = await this.animalService.findAll();
                res.status(200).json(animals);
            } catch {
                res.status(400).json();
            }

            res.end();
        })

        this.router.post("/", async (req, res) => {
            const animal: Animal = req.body;

            try {
                const id = await this.animalService.create(animal);
                res.status(200).json(id);
            } catch {
                res.status(400).json();
            }

            res.end();
        })

        this.router.delete("/:sid", async (req, res) => {
            const sid: number = parseInt(req.params.sid, 10);

            try {
                await this.animalService.delete(sid);
                res.status(200).json();
            } catch {
                res.status(400).json();
            }

            res.end();
        })

        this.router.put("/:sid", async (req, res) => {
            const sid: number = parseInt(req.params.sid, 10);
            const animal: Animal = req.body;

            try {
                await this.animalService.change(sid, animal);

                res.status(200).json();
            } catch {
                res.status(400).json();
            }

            res.end();
        })
    }

    public get router(): Router {
        return this._router;
    }
}