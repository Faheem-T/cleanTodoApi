import { ITodoRepository } from "../../domain/repositories/ITodoRepository.ts";

export class TodoUsecase {
  constructor(private todoRepository: ITodoRepository) {}

  createTodo(task: string) {
    return this.todoRepository.createTodo(task);
  }
  getTodos() {
    return this.todoRepository.getTodos();
  }

  delete(id: string) {
    return this.todoRepository.deleteTodo(id);
  }

  update(id: string, task: string) {
    return this.todoRepository.updateTodo(id, task);
  }
}
