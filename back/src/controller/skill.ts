import { Request, Response } from "express";
import dataSource from "../utils";
import { Skill } from "../entity/Skill";

const skillController = {
  create: async (req: Request, res: Response) => {
    try {
      await dataSource.getRepository(Skill).save(req.body);
      res.send("Created skill");
    } catch (error) {
      console.log(error);
      res.send("Error while creating skill");
    }
  },
  read: async (req: Request, res: Response) => {
    try {
      const data = await dataSource.getRepository(Skill).find();
      res.send(data);
    } catch (error) {
      console.log(error);
      res.send("error while querying skills");
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      await dataSource.getRepository(Skill).delete(req.body);
      res.send("deleted");
    } catch (error) {
      console.log(error);
      res.send("error while deleting skill");
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      await dataSource
        .getRepository(Skill)
        .update(req.body.id, req.body.newData);
      res.send("Updated");
    } catch (error) {
      console.log(error);
      res.send("error while updating skill");
    }
  },
};

export default skillController