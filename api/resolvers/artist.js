const { Artist, Company, ArtistImages, SocialLinks } = require("../database/models");
const { create, all, destroy, update, one } = require("./utils");

const artistIncludes = [
  { model: Company, as: "company" },
  { model: ArtistImages, as: "images" },
  { model: SocialLinks, as: "socialLinks" },
  { model: Artist, as: "members", through: "GroupMembers" },
  { model: Artist, as: "groups", through: "GroupMembers" }
];

module.exports = {
  types: {},

  queries: {
    artists: all(Artist, artistIncludes),
    artist: one(Artist, artistIncludes)
  },

  mutations: {
    createArtist: create(Artist, artistIncludes),
    updateArtist: update(Artist, artistIncludes),
    deleteArtist: destroy(Artist)
  }
};
