const { ArtistImages, Artist } = require("../database/models");
const { create, all, destroy, update, one, associations } = require("./utils");

module.exports = {
  types: {
    ArtistImages: {
      ...associations.belongsToAn("artist")
    }
  },

  queries: {
    artistImagesMultiple: all(ArtistImages),
    artistImages: one(ArtistImages)
  },

  mutations: {
    createArtistImages: create(ArtistImages),
    updateArtistImages: update(ArtistImages),
    deleteArtistImages: destroy(ArtistImages)
  }
};
