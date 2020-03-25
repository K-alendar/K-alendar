const {
  Artist,
  Company,
  ArtistImages,
  SocialLinks
} = require("../database/models");
const { create, all, destroy, update, one, _transformers } = require("./utils");
const moment = require("moment");

const artistIncludes = [
  { model: Company, as: "company" },
  { model: ArtistImages, as: "images" },
  { model: SocialLinks, as: "socialLinks" },
  { model: Artist, as: "members", through: "GroupMembers" },
  { model: Artist, as: "groups", through: "GroupMembers" }
];

const artistTransformers = _transformers.multi(
  _transformers.parseDate("startDate"),
  _transformers.parseDate("endDate")
);

module.exports = {
  types: {},

  queries: {
    artists: all(Artist, artistIncludes),
    artist: one(Artist, artistIncludes)
  },

  mutations: {
    createArtist: create(Artist, artistIncludes, artistTransformers),
    updateArtist: update(Artist, artistIncludes, artistTransformers),
    deleteArtist: destroy(Artist)
  }
};
