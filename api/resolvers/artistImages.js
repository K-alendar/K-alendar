const { artistImagesFactory } = require("./factories");

module.exports = {
  types: {
    ArtistImages: artistImagesFactory.associations()
  },

  queries: {
    artistImagesMultiple: artistImagesFactory.all(),
    artistImages: artistImagesFactory.one()
  },

  mutations: {
    createArtistImages: artistImagesFactory.create(),
    updateArtistImages: artistImagesFactory.update(),
    deleteArtistImages: artistImagesFactory.destroy()
  }
};
