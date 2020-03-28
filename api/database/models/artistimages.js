"use strict";
module.exports = (sequelize, DataTypes) => {
  const ArtistImages = sequelize.define(
    "ArtistImages",
    {
      icon: DataTypes.STRING,
      banner: DataTypes.STRING,
      cardTall: DataTypes.STRING,
      cardFlat: DataTypes.STRING,
      artistId: DataTypes.INTEGER
    },
    {}
  );
  ArtistImages.associate = function(models) {
    ArtistImages.belongsTo(models.Artist, { as: "artist", foreignKey: "artistId" });
  };
  return ArtistImages;
};
