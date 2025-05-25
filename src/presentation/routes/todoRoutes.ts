import { Router } from "express";
import { TodoUsecase } from "../../application/usecases/todoUsecase.ts";
import { TodoController } from "../controllers/TodoController.ts";
import { MongoDB } from "../../infrastructure/db/mongoDB.ts";

const router = Router();
const todoRepo = new MongoDB();
const todoUsecase = new TodoUsecase(todoRepo);

// controller
const todoController = new TodoController(todoUsecase);

router.get("/", todoController.getAll);

router.post("/", todoController.create);

router.delete("/:id", todoController.delete);

router.patch("/:id", todoController.update);

router.patch("/:id/complete", todoController.toggleComplete);

export { router as todoRouter };
