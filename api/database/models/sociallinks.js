"use strict";
module.exports = (sequelize, DataTypes) => {
  const SocialLinks = sequelize.define(
    "SocialLinks",
    {
      twitter: DataTypes.STRING,
      youtube: DataTypes.STRING,
      spotify: DataTypes.STRING,
      artistId: DataTypes.INTEGER
    },
    {}
  );
  SocialLinks.associate = function(models) {
    SocialLinks.belongsTo(models.Artist, { as: "artist", foreignKey: "artistId" });
  };
  return SocialLinks;
};
