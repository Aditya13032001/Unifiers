const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://todo:todo@cluster0.j4clupd.mongodb.net/");

// Schemas
const UserSchema = new mongoose.Schema({
  description: String,
});

const UserModel = mongoose.model("users", UserSchema);

app.get("/getUsers", (req, res) => {
  UserModel.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/addUser", async (req, res) => {
  try {
    const newUser = new UserModel({ description: req.body.description });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); // Return the saved user with HTTP status code 201 (Created)
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Delete a user by ID
app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

app.listen(3001, () => {
  console.log("Running");
});
