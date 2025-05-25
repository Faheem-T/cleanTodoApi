// @ts-types="npm:@types/express@5.0.2"
import express, { NextFunction, Request, Response } from "express";
import { todoRouter } from "./presentation/routes/todoRoutes.ts";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors({}));

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/todos", todoRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

mongoose
  .connect("mongodb://localhost/cleanTodo")
  .then(() => console.log("Connected to MongoDB"));
