import express from "express";
import { verifyAuth } from "../middlewares/auth.middleware.js";
import {
  createPerson,
  getAllPeople,
  updatePerson,
  deletePerson,
} from "../controllers/people.controller.js";

const peopleRouter = express.Router();

peopleRouter.use(verifyAuth);

peopleRouter.post("/", createPerson);
peopleRouter.get("/", getAllPeople);
peopleRouter.put("/:id", updatePerson);
peopleRouter.delete("/:id", deletePerson);

export default peopleRouter;
