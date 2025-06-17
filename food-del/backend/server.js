import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import chalk from 'chalk';

const logo = chalk.hex('#FF3C1F').bold('Butter-Food');
console.log('\n' + logo + '\n');


// Load environment variables from .env
dotenv.config();

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// API endpoints (we'll register them after DB is connected)

// Health-check endpoint
app.get("/", (req, res) => {
  res.send("API Working");
});

// Function to initialize DB and then start server
const startServer = async () => {
  try {
    // 1. Connect to database
    await connectDB();
    console.log("✅ Database connected");

    // 2. Register routes after successful DB connection
    app.use("/api/user", userRouter);
    app.use("/api/food", foodRouter);
    app.use("/images", express.static("uploads"));
    app.use("/api/cart", cartRouter);
    app.use("/api/order", orderRouter);

    // 3. Start listening
    app.listen(port, () => {
      console.log(`🚀 Server started on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Kick things off
startServer();
