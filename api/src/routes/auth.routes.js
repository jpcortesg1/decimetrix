import { Router } from "express";
import { createUser, login } from "./../controllers/auth.controller";
import {
  validateCreateUser,
  validateLogin,
  verifyAdmin,
} from "./../middlewares";

const router = Router();

router.post("/auth/register", verifyAdmin, validateCreateUser, createUser);
router.post("/auth/login", validateLogin, login);

export default router;
