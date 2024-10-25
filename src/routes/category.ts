import express, { Router } from "express";
import { createCategory } from "../models/category";
import { handler } from "../requestHandler";

const categoryRouter: Router = express.Router();

categoryRouter.post("/", handler(createCategory));

export default categoryRouter;
