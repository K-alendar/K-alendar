"use strict";
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define(
    "Artist",
    {
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      companyId: DataTypes.INTEGER,
      description: DataTypes.STRING,
      displayName: DataTypes.STRING,
      secondaryDisplayName: DataTypes.STRING,
      isGroup: DataTypes.BOOLEAN,
      memberCount: DataTypes.INTEGER,
    },
    {}
  );
  Artist.associate = function (models) {
    Artist.hasOne(models.SocialLinks, {
      as: "socialLinks",
      foreignKey: "artistId",
      onDelete: "CASCADE",
      hooks: true,
    });

    Artist.hasOne(models.ArtistImages, {
      as: "images",
      foreignKey: "artistId",
      onDelete: "CASCADE",
      hooks: true,
    });

    Artist.belongsTo(models.Company, {
      as: "company",
      foreignKey: "companyId",
    });

    Artist.belongsToMany(models.Artist, {
      through: models.GroupMember,
      as: "groups",
      foreignKey: "memberId",
      otherKey: "groupId",
    });

    Artist.belongsToMany(models.Artist, {
      through: models.GroupMember,
      as: "members",
      foreignKey: "groupId",
      otherKey: "memberId",
    });
  };
  return Artist;
};
