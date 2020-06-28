import express from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";

// ----------------------------------
// Routes Import
// ----------------------------------
import user from "./routes/user";
import login from "./routes/login";


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
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// ----------------------------------
// API Routes
// ----------------------------------
app.use("/api/v1/users", user);
app.use("/api/v1/login", login);
app.set("address", () => "http://localhost:6600");
// ----------------------------------
// Export app
// ----------------------------------
export default app;

