const { Artist } = require("../../database/models");
const socialLinksFactory = require("./socialLinks")
const artistImagesFactory = require("./artistImages")
const {
  transformers,
  ResolverFactory,
  ParentAssociation,
  ChildAssociation
} = require("../utils");

const artistTransformer = transformers.multi(
  transformers.parseDate("startDate"),
  transformers.parseDate("endDate")
);

const associations = [
  new ParentAssociation("company"),
  new ChildAssociation("members"),
  new ChildAssociation("groups"),
  new ChildAssociation("socialLinks", socialLinksFactory, { autoCreate: true }),
  new ChildAssociation("images", artistImagesFactory, { autoCreate: true })
];

module.exports = new ResolverFactory(Artist, {
  transformer: artistTransformer,
  fromObject: "artist",
  associations: associations
});
