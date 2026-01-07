router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, me);