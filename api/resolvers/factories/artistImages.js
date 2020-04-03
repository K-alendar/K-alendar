const { ArtistImages } = require("../../database/models");
const { ResolverFactory, ParentAssociation } = require("../utils");

const associations = [new ParentAssociation("artist")];

module.exports = new ResolverFactory(ArtistImages, {
  associations: associations,
  fromObject: "artistImages",
  validations: {
    icon: { url: true },
    banner: { url: true },
    cardTall: { url: true },
    cardFlat: { url: true },
  }
});
