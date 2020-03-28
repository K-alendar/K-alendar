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
      foreignKey: "artist_id",
      as: "socialLinks"
    });

    Artist.hasOne(models.ArtistImages, {
      foreignKey: "artist_id",
      as: "images"
    });

    Artist.belongsTo(models.Company, {
      foreignKey: "company_id",
      as: "company"
    });

    Artist.belongsToMany(models.Artist, {
      through: models.GroupMember,
      foreignKey: "member_id",
      as: "groups"
    });

    Artist.belongsToMany(models.Artist, {
      through: models.GroupMember,
      foreignKey: "group_id",
      as: "members"
    });

    // Hooks
    Artist.addHook(
      "afterCreate",
      "createArtistImages",
      async (artist, options) => {
        await models.ArtistImages.create({ artist_id: artist.id });
      }
    );

    Artist.addHook(
      "afterCreate",
      "createSocialLinks",
      async (artist, options) => {
        await models.SocialLinks.create({ artist_id: artist.id });
      }
    );
  };
  return Artist;
};
