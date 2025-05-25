import { Request, Response } from "express";
import { TodoUsecase } from "../../application/usecases/todoUsecase.ts";

export class TodoController {
  constructor(private todoUsecase: TodoUsecase) {}

  create = async (req: Request, res: Response) => {
    const task = req.body.task;
    const todo = await this.todoUsecase.createTodo(task);
    res.status(201).json({ todo });
  };

  getAll = async (_req: Request, res: Response) => {
    const todos = await this.todoUsecase.getTodos();
    res.status(200).json({ todos });
  };

  delete = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      throw new Error("ID not found!");
    }
    const deleted = await this.todoUsecase.delete(id);
    if (!deleted) {
      res.status(400).json({ message: "Todo not found!" });
    } else {
      res.status(200).json({ success: true, deleted });
    }
  };

  update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const task = req.body.task;
    if (!id) {
      throw new Error("ID not  found!");
    }
    if (!task) {
      throw new Error("Task not found!");
    }
    const updated = await this.todoUsecase.update(id, task);
    if (!updated) {
      res.status(400).json({ message: "Todo not found!" });
    } else {
      res.status(200).json({ success: true, updated });
    }
  };

  toggleComplete = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      throw new Error("ID not  found!");
    }
    const toggled = await this.todoUsecase.toggleComplete(id);
    if (!toggled) {
      res.status(400).json({ message: "Todo not found!" });
    } else {
      res.status(200).json({ success: true, toggled });
    }
  };
}
