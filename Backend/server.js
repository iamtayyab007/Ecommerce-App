import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoute from "./routes/authRoute.js";

// Rest Object
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(morgan("dev"));

// configuring dot env
dotenv.config();

// database connection
connectDB();

//routes
app.use("/api/v1/auth", authRoute);

// initializing Rest Api
app.get("/", (req, res) => {
  res.send({
    name: "arslan",
    age: 22,
    title: "good",
  });
});

// configuring the port
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} successfully`);
});
