'use strict';
module.exports = (sequelize, DataTypes) => {
  const SocialLinks = sequelize.define('SocialLinks', {
    twitter: DataTypes.STRING,
    youtube: DataTypes.STRING,
    spotify: DataTypes.STRING,
    artist_id: DataTypes.INTEGER
  }, {});
  SocialLinks.associate = function(models) {
    // associations can be defined here
  };
  return SocialLinks;
};