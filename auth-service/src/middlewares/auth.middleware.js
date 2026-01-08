const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("AUTH HEADER =", authHeader);

    const token = authHeader?.split(" ")[1];
    console.log("TOKEN =", token);

    if (!token) {
      return res.status(401).json({ error: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED =", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT ERROR =", err.message);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { authMiddleware };