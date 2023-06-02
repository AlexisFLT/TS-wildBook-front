import express = require("express");
import cors = require("cors");
import dataSource from "./utils";
import {Request, Response} from "express";
import wilderController from "./controller/wilder";
import skillController from "./controller/skill";
import gradeController from "./controller/grade";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.post("/api/wilder", wilderController.create);
app.get("/api/wilder", wilderController.read);
app.delete("/api/wilder/:id", wilderController.delete);
app.put("/api/wilder", wilderController.update);

app.post("/api/skill", skillController.create);
app.get("/api/skill", skillController.read);
app.delete("/api/skill/:id", skillController.delete);
app.put("/api/skill", skillController.update);

app.post("/api/grade", gradeController.create);
app.get("/api/grade", gradeController.read);

app.use((req: Request, res: Response, next) => {
  res.status(404).send("Sorry can't find that!");
});

const start = async (): Promise<void> => {
  await dataSource.initialize();
  app.listen(5000, () => console.log("Server started on 5000"));
};

void start();