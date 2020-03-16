'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Artists', [{
        id: 1,
        displayName: 'Red Velvet',
        secondaryDisplayName: '레드 벨벳',
        startDate: new Date(),
        company_id: 1,
        description: "It's Red Velvet",
        isGroup: true,
        memberCount: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Artists', null, {});
  }
};
