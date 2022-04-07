import { Router } from "express";
import { verifyAdmin, validateCreateTask } from "../middlewares";
import { createTask } from "./../controllers/task.controller";

const router = Router();

router.post("/tasks", verifyAdmin, validateCreateTask, createTask);

export default router;
