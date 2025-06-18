import { verifyToken } from "../services/jwt.service.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token malformed" });

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    void err;
    return res.status(401).json({ message: "Invalid token" });
  }
};
