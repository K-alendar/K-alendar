const { ArtistImages, Artist } = require("../database/models");
const { create, all, destroy, update, one } = require("./utils");

const artistImagesIncludes = [{ model: Artist, as: "artist" }];

module.exports = {
  types: {},

  queries: {
    artistImagesMultiple: all(ArtistImages, { include: artistImagesIncludes }),
    artistImages: one(ArtistImages, { include: artistImagesIncludes })
  },

  mutations: {
    createArtistImages: create(ArtistImages, { include: artistImagesIncludes }),
    updateArtistImages: update(ArtistImages, { include: artistImagesIncludes }),
    deleteArtistImages: destroy(ArtistImages)
  }
};
