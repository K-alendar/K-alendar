const { ArtistImages } = require("../../database/models");
const { ResolverFactory, ParentAssociation } = require("../utils");

const associations = [new ParentAssociation("artist")];

module.exports = new ResolverFactory(ArtistImages, {
  associations: associations,
  fromObject: "artistImages",
  validations: {
    icon: { url: true, length: { maximum: 255 } },
    banner: { url: true, length: { maximum: 255 } },
    cardTall: { url: true, length: { maximum: 255 } },
    cardFlat: { url: true, length: { maximum: 255 } },
  },
});
