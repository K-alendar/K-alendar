const { ArtistImages } = require("../../database/models");
const { ResolverFactory, ParentAssociation } = require("../utils");

const associations = [new ParentAssociation("artist")];

module.exports = new ResolverFactory(ArtistImages, {
  associations: associations,
  fromObject: "artistImages"
});
