'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SocialLinks', [{
      artist_id: 1,
      twitter: "https://twitter.com/RVsmtown",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('SocialLinks', null, {});
  }
};
