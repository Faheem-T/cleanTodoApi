import { ITodo } from "../entities/Todo.ts";

export interface ITodoRepository {
  getTodos(): Promise<ITodo[]>;
  createTodo(task: string): Promise<ITodo>;
  deleteTodo(id: string): Promise<ITodo | null>;
  updateTodo(id: string, task: string): Promise<ITodo | null>;
  toggleTodoComplete(id: string): Promise<ITodo | null>;
}
