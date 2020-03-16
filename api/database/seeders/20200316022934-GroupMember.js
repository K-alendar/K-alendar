"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "GroupMembers",
      [
        {
          group_id: 1,
          member_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          group_id: 1,
          member_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          group_id: 1,
          member_id: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("GroupMembers", null, {});
  }
};
