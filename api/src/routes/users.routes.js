import { Router } from "express";
import { verifyAdmin, verifyUserOrAdmin } from "./../middlewares";
import { getUsers, getUser } from "./../controllers/user.controller";

const router = Router();

router.get("/users", verifyAdmin, getUsers);

router.get("/users/:id", verifyUserOrAdmin, getUser);

router.put("/users/:id");

router.delete("/users/:id");

export default router;
