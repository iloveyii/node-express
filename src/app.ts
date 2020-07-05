import express from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";

// ----------------------------------
// Routes Import
// ----------------------------------
import user from "./routes/user";
import product from "./routes/product";
import login from "./routes/login";
import { Database } from "./models/base/Database";
import Mongo from "./models/Mongo";


// ----------------------------------
// Connect to DB
// ----------------------------------
const dialect = "mongodb"; // process.env.DB_DIALECT || "mongodb";




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
app.use("/api/v1/products", product);
app.use("/api/v1/login", login);

// ----------------------------------
// Export app
// ----------------------------------
export default app;

