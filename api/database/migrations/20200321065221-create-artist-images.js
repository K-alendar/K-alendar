"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ArtistImages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      icon: {
        type: Sequelize.STRING
      },
      banner: {
        type: Sequelize.STRING
      },
      cardTall: {
        type: Sequelize.STRING
      },
      cardFlat: {
        type: Sequelize.STRING
      },
      artist_id: {
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
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("ArtistImages");
  }
};
