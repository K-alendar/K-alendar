const { ArtistImages } = require("../database/models");
const { ResolverFactory, ParentAssociation } = require("./utils");

const associations = [new ParentAssociation("artist")];

const generator = new ResolverFactory(ArtistImages, {
  associations: associations,
  fromObject: "artistImages"
});

module.exports = {
  types: {
    ArtistImages: generator.associations()
  },

  queries: {
    artistImagesMultiple: generator.all(),
    artistImages: generator.one()
  },

  mutations: {
    createArtistImages: generator.create(),
    updateArtistImages: generator.update(),
    deleteArtistImages: generator.destroy()
  }
};
