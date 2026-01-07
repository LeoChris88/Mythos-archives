const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/role.middleware");

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected routes
router.get("/me", authMiddleware, authController.me);
router.get("/admin/users", authMiddleware, isAdmin, authController.listUsers);
router.patch("/users/:id/role", authMiddleware, isAdmin, authController.changeRole);

module.exports = router;