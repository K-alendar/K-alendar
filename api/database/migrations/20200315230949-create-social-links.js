'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SocialLinks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      twitter: {
        type: Sequelize.STRING
      },
      youtube: {
        type: Sequelize.STRING
      },
      spotify: {
        type: Sequelize.STRING
      },
      artist_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Artists',
          key: 'id'
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
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SocialLinks');
  }
};