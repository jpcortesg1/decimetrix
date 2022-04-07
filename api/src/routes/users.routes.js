import { Router } from "express";
import {
  verifyAdmin,
  verifyUserOrAdmin,
  validateUpdate,
} from "./../middlewares";
import {
  getUsers,
  getUser,
  putUser,
  deleteUser,
} from "./../controllers/user.controller";

const router = Router();

router.get("/users", verifyAdmin, getUsers);

router.get("/users/:id", verifyUserOrAdmin, getUser);

router.put("/users/:id", verifyUserOrAdmin, validateUpdate, putUser);

router.delete("/users/:id", verifyUserOrAdmin, deleteUser);

export default router;
