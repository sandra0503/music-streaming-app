import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth";
import { auth } from "./middleware/auth";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use("/api/auth", authRoutes);

app.get("/api/protected", auth, (req, res) => {
  res.json({ msg: "This is a protected route" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
