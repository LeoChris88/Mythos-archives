const prisma = require("../lib/prisma");

module.exports = {
  findByEmail(email) {
    return prisma.user.findUnique({
      where: { email }
    });
  },

  createUser(data) {
    return prisma.user.create({
      data
    });
  }
};