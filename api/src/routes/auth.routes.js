import { Router } from "express";
import { createUser } from "./../controllers/auth.controller";

const router = Router();

router.get("/auth/register", createUser);

export default router;
