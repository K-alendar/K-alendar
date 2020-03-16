"use strict";
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define(
    "Artist",
    {
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      company_id: DataTypes.INTEGER,
      description: DataTypes.STRING,
      displayName: DataTypes.STRING,
      secondaryDisplayName: DataTypes.STRING,
      isGroup: DataTypes.BOOLEAN,
      memberCount: DataTypes.INTEGER
    },
    {}
  );
  Artist.associate = function(models) {
    Artist.hasOne(models.SocialLinks, {
      foreignKey: "artist_id"
    });

    Artist.belongsTo(models.Company, {
      foreignKey: "company_id",
      as: "company"
    });

    Artist.belongsToMany(models.Artist, {
      through: models.GroupMember,
      foreignKey: "group_id",
      as: "members"
    });

    Artist.belongsToMany(models.Artist, {
      through: models.GroupMember,
      foreignKey: "member_id",
      as: "groups"
    });
  };
  return Artist;
};
