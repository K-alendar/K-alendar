const ArtistResolvers = require("./artist");
const CompanyResolvers = require("./company");
const GroupMemberResolvers = require("./groupMembers")

module.exports = {
  ...ArtistResolvers.types,
  ...CompanyResolvers.types,
  ...GroupMemberResolvers.types,

  Query: {
    ...ArtistResolvers.queries,
    ...CompanyResolvers.queries,
    ...GroupMemberResolvers.queries
  },

  Mutation: {
    ...ArtistResolvers.mutations,
    ...CompanyResolvers.mutations,
    ...GroupMemberResolvers.mutations
  }
};
