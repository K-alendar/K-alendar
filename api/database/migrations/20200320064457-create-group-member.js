"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("GroupMembers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      groupName: {
        type: Sequelize.STRING
      },
      groupId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Artists",
          key: "id"
        }
      },
      memberId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Artists",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    return await queryInterface.addConstraint(
      "GroupMembers",
      ["groupId", "memberId"],
      {
        type: "unique",
        name: "groupMemberIndex"
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("GroupMembers");
  }
};
