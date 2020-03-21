'use strict';
module.exports = (sequelize, DataTypes) => {
  const SocialLinks = sequelize.define('SocialLinks', {
    twitter: DataTypes.STRING,
    youtube: DataTypes.STRING,
    spotify: DataTypes.STRING,
    artist_id: DataTypes.INTEGER
  }, {});
  SocialLinks.associate = function(models) {
    SocialLinks.belongsTo(models.Artist, {
      foreignKey: "artist_id",
      as: "artist"
    });
  };
  return SocialLinks;
};