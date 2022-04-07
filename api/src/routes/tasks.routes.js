import { Router } from "express";
import {
  verifyAdmin,
  validateCreateTask,
  verifyUserOrAdmin,
  verifyTaskUser,
  validateUpdateStatus,
} from "../middlewares";

import {
  changeStatus,
  createTask,
  getTasks,
  getTasksUser,
  updateTask,
  deleteTask,
} from "./../controllers/task.controller";

const router = Router();

router.get("/tasks", verifyAdmin, getTasks);

router.get("/tasks/:id", verifyUserOrAdmin, getTasksUser);

router.post("/tasks", verifyAdmin, validateCreateTask, createTask);

router.put("/tasks/:id", verifyUserOrAdmin, validateCreateTask, updateTask);

router.put(
  "/tasks/status/:id",
  verifyTaskUser,
  validateUpdateStatus,
  changeStatus
);

router.delete("/tasks/:id", verifyAdmin, deleteTask);

export default router;
