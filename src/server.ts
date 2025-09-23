import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRoutes";

//DB CONFIG
dotenv.config();
connectDB();

//EXPRESS CONFIG
const app = express();
app.use(express.json());

//ROUTES
app.use('/api/projects', projectRoutes);


export default app;