import { ITodo } from "../../domain/entities/Todo.ts";
import { ITodoRepository } from "../../domain/repositories/ITodoRepository.ts";
import { Todo, TodoModel } from "./models/TodoModel.ts";

export class MongoDB implements ITodoRepository {
  Todo: TodoModel;
  constructor() {
    this.Todo = Todo;
  }

  async getTodos(): Promise<ITodo[]> {
    const todos = await Todo.find({}, { task: 1, _id: 1, completed: 1 });
    if (!todos) {
      return [];
    }
    return todos.map(({ task, completed, id }) => ({ task, completed, id }));
  }
  async createTodo(task: string): Promise<ITodo> {
    const todo = new Todo({ task, completed: false });
    await todo.save();
    return { task: todo.task, completed: todo.completed, id: todo.id };
  }

  async deleteTodo(id: string): Promise<ITodo | null> {
    const deleted = await Todo.findByIdAndDelete(id, {
      returnDocument: "after",
    });
    if (!deleted) return null;
    return { id: deleted.id, task: deleted.task, completed: deleted.completed };
  }

  async updateTodo(id: string, task: string): Promise<ITodo | null> {
    const updated = await Todo.findByIdAndUpdate(
      id,
      { task },
      { returnDocument: "after" }
    );
    if (!updated) return null;
    return { id: updated.id, task: updated.task, completed: updated.completed };
  }
}
