const authService = require("../services/auth.service");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    console.log("BODY REÇU =", req.body);
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error("REGISTER ERROR =", err.message);
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const me = async (req, res) => {
  try {
    const user = await authService.me(req.user.userId);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const changeRole = async (req, res) => {
  try {
    const updated = await authService.changeRole(req.params.id, req.body.role);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const listUsers = async (req, res) => {
  try {
    const users = await authService.listUsers();
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateReputation = async (req, res) => {
  const { id } = req.params;
  const { delta } = req.body;

  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      reputation: { increment: delta }
    }
  });

  // auto promotion
  if (user.reputation >= 10 && user.role === 'USER') {
    await prisma.user.update({
      where: { id: user.id },
      data: { role: 'EXPERT' }
    });
  }

  res.json(user);
}

module.exports = { register, login, me, changeRole, listUsers, updateReputation };