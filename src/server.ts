import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRoutes";

//DB CONFIG
dotenv.config();
connectDB();

//EXPRESS CONFIG
const app = express();

app.use(cors(corsConfig));
app.use(express.json());

//ROUTES
app.use('/api/projects', projectRoutes);


export default app;