import * as UserModel from "../models/users.model.js";

export const getUsers = async (req, res) => {
  const users = await UserModel.getAllUsers();
  res.json(users);
};

export const getUser = async (req, res) => {
  const user = await UserModel.getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const createUser = async (req, res) => {
  const { name, email, password_hash, is_producer, avatar_url } = req.body;
  try {
    const user = await UserModel.createUser({
      name,
      email,
      password_hash,
      is_producer,
      avatar_url,
    });
    res.status(201).json(user);
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateUser = async (req, res) => {
  const updated = await UserModel.updateUser(req.params.id, req.body);
  if (updated === 0)
    return res
      .status(404)
      .json({ message: "User not found or no changes made" });
  res.json({ message: "User updated successfully" });
};

export const deleteUser = async (req, res) => {
  const deleted = await UserModel.deleteUser(req.params.id);
  if (deleted === 0) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted successfully" });
};
