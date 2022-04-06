import { Router } from "express";
import { validateCreateUser, validateLogin } from "./../middlewares/user";
import { createUser, login } from "./../controllers/auth.controller";
import { verifyAdmin } from "./../middlewares/admin";

const router = Router();

router.post("/auth/register", verifyAdmin, validateCreateUser, createUser);
router.post("/auth/login", validateLogin, login);

export default router;
