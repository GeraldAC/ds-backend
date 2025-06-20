import * as UserModel from "../models/users.model.js";
import {
  hashPassword,
  comparePasswords,
} from "../services/password.service.js";
import { generateToken } from "../services/jwt.service.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await UserModel.getUserByEmail(email);
  if (existing)
    return res.status(400).json({ message: "Email already registered" });

  const password_hash = await hashPassword(password);
  const user = await UserModel.createUser({ name, email, password_hash });

  res.status(201).json({ message: "User registered successfully", user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.getUserByEmail(email);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const valid = await comparePasswords(password, user.password_hash);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken({ id: user.id, email: user.email });

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      is_producer: Boolean(user.is_producer),
      avatar_url: user.avatar_url,
    },
  });
};
