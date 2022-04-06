import { Router } from "express";
import pool from "./../database/connection";

const router = Router();

router.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    return res.status(200).json(result.rows[0].now);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = router;
