const prisma = require("../lib/prisma");

module.exports = {
  findByEmail(email) {
    return prisma.user.findUnique({
      where: { email }
    });
  },

  findById(id) {
    return prisma.user.findUnique({
      where: { id: Number(id) }
    });
  },

  createUser(data) {
    return prisma.user.create({
      data
    });
  },

  updateRole(id, role) {
    return prisma.user.update({
      where: { id: Number(id) },
      data: { role }
    });
  },

  getAllUsers() {
    return prisma.user.findMany();
  }
};