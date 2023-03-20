const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users" });
  }
};

const getUserById = async (req, res) => {
  try {
    console.log("Attempting to connect to MongoDB database...");
    const user = await User.findById(req.params.id);
    console.log("Successfully retrieved user data from database.");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.log("Error retrieving user data from database:", error);
    res.status(500).json({ error: "Error retrieving user" });
  }
};

const createUser = async (req, res) => {
  const { first_name, last_name, email, phonenumber, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      first_name,
      last_name,
      email,
      phonenumber,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

const updateUser = async (req, res) => {
  console.log(`updating user ${req.body.email}`);
  const { first_name, last_name, email, phonenumber, password, isAdmin } =
    req.body;
  const { id } = req.params;

  try {
    const hashedPassword = password
      ? await bcrypt.hash(password, saltRounds)
      : null;

    const updatedUser = {
      first_name,
      last_name,
      email,
      phonenumber,
      ...(hashedPassword && { password: hashedPassword }),
      isAdmin,
    };

    const result = await User.findByIdAndUpdate(id, updatedUser, { new: true });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
