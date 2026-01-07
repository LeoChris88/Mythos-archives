const authService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
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

module.exports = { register, login, me, changeRole, listUsers };