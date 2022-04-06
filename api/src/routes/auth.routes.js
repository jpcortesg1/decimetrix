import { Router } from "express";
import validateCreate from "./../middlewares/user";
import { createUser } from "./../controllers/auth.controller";

const router = Router();

router.post("/auth/register", validateCreate, createUser);

export default router;
