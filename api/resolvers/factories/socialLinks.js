const { SocialLinks } = require("../../database/models");
const { ResolverFactory, ParentAssociation } = require("../utils");

const associations = [new ParentAssociation("artist")];

module.exports = new ResolverFactory(SocialLinks, {
  associations: associations,
  fromObject: "socialLinks",
  validations: {
    twitter: { url: true, length: { maximum: 255 } },
    youtube: { url: true, length: { maximum: 255 } },
    spotify: { url: true, length: { maximum: 255 } },
  },
});
