const { ArtistImages, Artist } = require("../database/models");
const { create, all, destroy, update, one } = require("./utils");

const artistImagesIncludes = [ { model: Artist, as: "artist" }];

module.exports = {
  types: {},

  queries: {
    artistImagesMultiple: all(ArtistImages, artistImagesIncludes),
    artistImages: one(ArtistImages, artistImagesIncludes)
  },

  mutations: {
    createArtistImages: create(ArtistImages, artistImagesIncludes),
    updateArtistImages: update(ArtistImages, artistImagesIncludes),
    deleteArtistImages: destroy(ArtistImages)
  }
};
