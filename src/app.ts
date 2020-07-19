import express from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import expressLayouts from "express-ejs-layouts";


// ----------------------------------
// Routes Import
// ----------------------------------
import product from "./routes/product";
import article from "./routes/article";
import login from "./routes/login";
import user from "./routes/user";
import question from "./routes/question";
import quiz from "./routes/quiz";

import front from "./routes/front";
import admin from "./routes/admin";
import * as path from "path";

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
app.use(cors({origin: "*", optionsSuccessStatus: 200}));

// ----------------------------------
// EJS Layouts
// ----------------------------------
app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// ----------------------------------
// API Routes
// ----------------------------------
app.use("/api/v1/users", user);
app.use("/api/v1/products", product);
app.use("/api/v1/articles", article);
app.use("/api/v1/login", login);
app.use("/api/v1/users", user);
app.use("/api/v1/questions", question);
app.use("/api/v1/quizzes", quiz);

app.use("/admin", admin);
app.use("/", front);

// ----------------------------------
// Export app
// ----------------------------------
export default app;

