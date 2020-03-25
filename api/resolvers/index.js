const ArtistResolvers = require("./artist");
const CompanyResolvers = require("./company");
const GroupMemberResolvers = require("./groupMembers");
const ArtistImagesResolvers = require("./artistImages");

module.exports = {
  ...ArtistResolvers.types,
  ...CompanyResolvers.types,
  ...GroupMemberResolvers.types,
  ...ArtistImagesResolvers.types,

  Query: {
    ...ArtistResolvers.queries,
    ...CompanyResolvers.queries,
    ...GroupMemberResolvers.queries,
    ...ArtistImagesResolvers.queries
  },

  Mutation: {
    ...ArtistResolvers.mutations,
    ...CompanyResolvers.mutations,
    ...GroupMemberResolvers.mutations,
    ...ArtistImagesResolvers.mutations
  }
};
