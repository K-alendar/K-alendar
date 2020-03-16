"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Artists",
      [
        {
          id: 1,
          displayName: "Red Velvet",
          secondaryDisplayName: "레드 벨벳",
          startDate: new Date(),
          company_id: 1,
          description: "It's Red Velvet",
          isGroup: true,
          memberCount: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          displayName: "Yeri",
          secondaryDisplayName: "예리",
          startDate: new Date(),
          company_id: 1,
          description: "It's Yeri",
          isGroup: false,
          memberCount: -1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          displayName: "Seulgi",
          secondaryDisplayName: "슬기",
          startDate: new Date(),
          company_id: 1,
          description: "It's Seulgi",
          isGroup: false,
          memberCount: -1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          displayName: "Irene",
          secondaryDisplayName: "아이린",
          startDate: new Date(),
          company_id: 1,
          description: "It's Irene",
          isGroup: false,
          memberCount: -1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Artists", null, {});
  }
};
