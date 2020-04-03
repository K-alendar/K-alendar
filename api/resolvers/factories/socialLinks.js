const { SocialLinks } = require("../../database/models");
const { ResolverFactory, ParentAssociation } = require("../utils");

const associations = [new ParentAssociation("artist")];

module.exports = new ResolverFactory(SocialLinks, {
  associations: associations,
  fromObject: "socialLinks",
  validations: {
    twitter: { url: true },
    youtube: { url: true },
    spotify: { url: true }
  }
});
