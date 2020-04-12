const { Artist, GroupMember } = require("../../database/models");
const socialLinksFactory = require("./socialLinks");
const artistImagesFactory = require("./artistImages");
const {
  transformers,
  ResolverFactory,
  ParentAssociation,
  ChildAssociation,
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
  new ChildAssociation("images", artistImagesFactory, { autoCreate: true }),
];

const computedProperties = {
  memberCount: async (artist) => {
    return GroupMember.count({
      where: { groupId: artist.id }
    })
  },

  groupCount: async (artist) => {
    return GroupMember.count({
      where: { memberId: artist.id }
    })
  }
}

module.exports = new ResolverFactory(Artist, {
  transformer: artistTransformer,
  fromObject: "artist",
  associations: associations,
  computedProperties: computedProperties,
  validations: {
    startDate: {
      presence: { allowEmpty: false, isString: true },
      datetime: true,
    },
    endDate: {
      datetime: true,
    },
    description: { type: "string" },
    displayName: {
      presence: { allowEmpty: false },
      type: "string",
      length: { maximum: 255 },
    },
    secondaryDisplayName: {
      presence: { allowEmpty: false },
      type: "string",
      length: { maximum: 255 },
    },
    isGroup: { type: "boolean" },
  },
});
