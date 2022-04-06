// Required modules
import express from "express";
import config from "./config";
import usersRoutes from "./routes/users.routes";
import authRoutes from "./routes/auth.routes";

// Create app
const app = express();

// Settings
app.set("port", config.port || 3000);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(usersRoutes);
app.use(authRoutes);

export default app;
