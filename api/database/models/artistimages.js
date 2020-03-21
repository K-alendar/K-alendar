"use strict";
module.exports = (sequelize, DataTypes) => {
  const ArtistImages = sequelize.define(
    "ArtistImages",
    {
      icon: DataTypes.STRING,
      banner: DataTypes.STRING,
      cardTall: DataTypes.STRING,
      cardFlat: DataTypes.STRING,
      artist_id: DataTypes.INTEGER
    },
    {}
  );
  ArtistImages.associate = function(models) {
    ArtistImages.belongsTo(models.Artist, {
      foreignKey: "artist_id",
      as: "artist"
    });
  };
  return ArtistImages;
};
