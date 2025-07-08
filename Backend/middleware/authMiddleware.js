import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};


export default authMiddleware;