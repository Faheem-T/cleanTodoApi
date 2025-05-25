import { ITodo } from "../../domain/entities/Todo.ts";
import { ITodoRepository } from "../../domain/repositories/ITodoRepository.ts";

export class inMemoryDB implements ITodoRepository {
  private todos: ITodo[];
  private nextId: number;

  constructor() {
    this.todos = [];
    this.nextId = 1;
  }

  async getTodos(): Promise<ITodo[]> {
    return await new Promise<ITodo[]>((resolve, _reject) => {
      resolve(this.todos);
    });
  }

  async createTodo(task: string) {
    const id = crypto.randomUUID();
    const newTodo = { id, task, completed: false };
    await new Promise<void>((resolve, _reject) => {
      this.todos.push(newTodo);
      resolve();
    });
    return newTodo;
  }

  async deleteTodo(id: string): Promise<ITodo | null> {
    return await new Promise<ITodo | null>((resolve, _reject) => {
      let deleted;
      this.todos = this.todos.filter((todo) => {
        if (todo.id !== id) {
          return true;
        } else {
          deleted = todo;
          return false;
        }
      });
      resolve(deleted || null);
    });
  }

  async updateTodo(id: string, task: string): Promise<ITodo> {
    return await new Promise<ITodo>((resolve, reject) => {
      const foundTodo = this.todos.find((todo) => todo.id === id);
      if (!foundTodo) {
        return reject("Todo not found");
      }
      foundTodo.task = task;
      resolve(foundTodo);
    });
  }
}
