const ArtistResolvers = require("./artist");
const CompanyResolvers = require("./company");

module.exports = {
  ...ArtistResolvers.types,
  ...CompanyResolvers.types,

  Query: {
    ...ArtistResolvers.queries,
    ...CompanyResolvers.queries
  },

  Mutation: {
    ...ArtistResolvers.mutations,
    ...CompanyResolvers.mutations
  }
};
