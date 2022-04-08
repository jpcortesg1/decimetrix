// Required modules
import express from "express";
import fileUpload from "express-fileupload";
import config from "./config";
import usersRoutes from "./routes/users.routes";
import tasksRoutes from "./routes/tasks.routes";
import authRoutes from "./routes/auth.routes";
import path from "path";

// Create app
const app = express();

// Settings
app.set("port", config.port || 3000);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./src/upload",
  })
);
app.use("/images", express.static(path.join(__dirname, "/upload")));

// Routes
app.use(authRoutes);
app.use(usersRoutes);
app.use(tasksRoutes);

export default app;
