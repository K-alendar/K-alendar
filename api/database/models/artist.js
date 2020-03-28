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
      memberCount: DataTypes.INTEGER
    },
    {}
  );
  Artist.associate = function(models) {
    Artist.hasOne(models.SocialLinks, {
      as: "socialLinks",
      foreignKey: "artistId"
    });

    Artist.hasOne(models.ArtistImages, {
      as: "images",
      foreignKey: "artistId"
    });

    Artist.belongsTo(models.Company, {
      as: "company",
      foreignKey: "companyId"
    });

    Artist.belongsToMany(models.Artist, {
      through: models.GroupMember,
      as: "groups",
      foreignKey: "memberId"
    });

    Artist.belongsToMany(models.Artist, {
      through: models.GroupMember,
      as: "members",
      foreignKey: "groupId"
    });

    // Hooks
    Artist.addHook(
      "afterCreate",
      "createArtistImages",
      async (artist, options) => {
        await models.ArtistImages.create({ artistId: artist.id });
      }
    );

    Artist.addHook(
      "afterCreate",
      "createSocialLinks",
      async (artist, options) => {
        await models.SocialLinks.create({ artistId: artist.id });
      }
    );
  };
  return Artist;
};
