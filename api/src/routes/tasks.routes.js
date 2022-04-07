import { Router } from "express";
import {
  verifyAdmin,
  validateCreateTask,
  verifyUserOrAdmin,
} from "../middlewares";
import { createTask, getTasks, getTask } from "./../controllers/task.controller";

const router = Router();

router.get("/tasks", verifyAdmin, getTasks);

router.get("/tasks/:id", verifyUserOrAdmin, getTask);

router.post("/tasks", verifyAdmin, validateCreateTask, createTask);

export default router;
