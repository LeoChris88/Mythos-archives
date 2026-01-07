const jwt = require("jsonwebtoken");
const { createUser, findByEmail, findById, updateRole, getAllUsers } = require("../repositories/user.repository");
const { hashPassword, comparePassword } = require("../utils/hash");

const register = async ({ email, username, password }) => {
  const existingUser = await findByEmail(email);
  if (existingUser) throw new Error("Email already exists");

  const hashed = await hashPassword(password);
  return await createUser({ email, username, password: hashed });
};

const login = async ({ email, password }) => {
  const user = await findByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  return { token, user };
};

const me = async (id) => {
  return await findById(id);
};

const changeRole = async (id, role) => {
  return await updateRole(id, role);
};

const listUsers = async () => {
  return await getAllUsers();
};

module.exports = { register, login, me, changeRole, listUsers };