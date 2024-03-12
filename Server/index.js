import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/auth")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/Login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (user) {
        if (password === user.password) {
          res.send({ message: "Login successful", user: user });
        } else {
          res.send({ message: "Wrong credentials" });
        }
      } else {
        res.send("User not registered");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  app.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        res.send({ message: "User already exists" });
      } else {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.send({ message: "Registration successful" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  

app.listen(6969, () => {
  console.log("Server started on port 6969");
});
