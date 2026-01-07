const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient(); // rien d’autre à mettre ici

module.exports = {
  createUser: (data) => prisma.user.create({ data }),
  findByEmail: (email) => prisma.user.findUnique({ where: { email } }),
  findById: (id) => prisma.user.findUnique({ where: { id } }),
  updateRole: (id, role) => prisma.user.update({ where: { id }, data: { role } }),
  getAllUsers: () => prisma.user.findMany(),
};