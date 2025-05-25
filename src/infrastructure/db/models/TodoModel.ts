import mongoose from "mongoose";
import { ITodo } from "../../../domain/entities/Todo.ts";

const todoSchema = new mongoose.Schema<ITodo>({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});

export const Todo = mongoose.model<ITodo>("Todo", todoSchema);

export type TodoModel = typeof Todo;
