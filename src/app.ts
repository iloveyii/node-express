import express from "express";
import cors from "cors";
import compression from "compression";

// ----------------------------------
// Routes Import
// ----------------------------------
import list from "./routes/list";
import user from "./routes/user";


// ----------------------------------
// Connect to DB
// ----------------------------------
// const connectDB = require("./config/db");
// connectDB();

// ----------------------------------
// Express configuration
// ----------------------------------
const app: any = express();
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(express.urlencoded({extended: true}));

// ----------------------------------
// API Routes
// ----------------------------------
app.use("/api/v1/users", user);

// ----------------------------------
// Export app
// ----------------------------------
export default app;

