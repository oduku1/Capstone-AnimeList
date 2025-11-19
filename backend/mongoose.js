import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken"
import express from "express";
import bcrypt from "bcrypt"
import mongoose from "mongoose";
import cors from "cors";
import AnimeModel from "./models/Anime.js";
import UserModel from "./models/Users.js";

const app = express();
const saltRounds = 10; 
const JWT_SECRET = process.env.JWT_SECRET
// ✅ Enable JSON parsing first
app.use(express.json());

// ✅ Allow your frontend origin and preflight requests
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Optional: extra safety headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ✅ MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
connectDB();







app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check for existing email
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Check for existing username
    const existingUserName = await UserModel.findOne({ username });
    if (existingUserName) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });

  } catch (e) {
    console.error("❌ Registration error:", e);
    res.status(500).json({ error: e.message });
  }
});



app.post("/api/users/:username/anime", async (req, res) => {
  try {
    const { username } = req.params;
    const { title, episodes, image, status, rating, episodesWatched,genres } = req.body;



    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Save anime with real MongoDB user ID
    const newAnime = new AnimeModel({
      title,
      genres,
      image,
      episodesWatched,
      status,
      rating,
      episodes,
      dateAdded: new Date(),
      userId: user._id
    });

    await newAnime.save();

    res.status(201).json(newAnime);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to add anime" });
  }
});

app.put("/api/anime/:animeId", async (req, res) => {
  try {
    const { animeId } = req.params;
    const { status, episodesWatched, rating } = req.body;

    const updatedAnime = await AnimeModel.findByIdAndUpdate(
      animeId,
      { status, episodesWatched, rating },
      { new: true }
    );

    res.json(updatedAnime);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to update anime" });
  }
});

app.get("/api/profile/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userAnime = await AnimeModel.find({ userId: user._id });


    res.status(200).json({ userAnime });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ Start server
app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});