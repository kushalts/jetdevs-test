"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
     return await queryInterface.bulkInsert("users", [
      {
        email: "admin1@gmail.com",
        password: "$2a$10$v0bOx2XTIaEmhVzvgWSCJujJzO6sIFIdcq3mR9siZ0EOjI.9MNv.2",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "user123@gmail.com",
        password: "$2a$10$v0bOx2XTIaEmhVzvgWSCJujJzO6sIFIdcq3mR9siZ0EOjI.9MNv.2",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("user", null, {});
  },
};
