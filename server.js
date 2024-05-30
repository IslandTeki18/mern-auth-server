import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/database.js";
import userRoutes from "./src/routes/user.js";

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`);
});
