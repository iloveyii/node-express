import dotenv from "dotenv";
import app from "./src/app";


// ----------------------------------
// Environment setup
// ----------------------------------
dotenv.config({path: ".env"});
const {
    PORT = 5500,
    SESS_NAME = "sid",
    SESS_SECRET = "top-secret",
    SESS_LIFETIME = 1000 * 60 * 60 * 2, // 2 hrs
} = process.env;

// ----------------------------------
// Express server
// ----------------------------------
const server = app.listen(PORT, () => {
    console.log(
        "  App is running on http://localhost:%d in %s mode",
        PORT,
        process.env.NODE_ENV ? process.env.NODE_ENV : "prod",
    );
    console.log("  Press CTRL-C to stop\n");
});

export default server;
