const crudResolvers = require("./crud");
const transformers = require("./transformers");
const associations = require("./associations");
const {
  ResolverFactory,
  Association,
  ChildAssociation,
  ParentAssociation
} = require("./resolverFactory");

module.exports = {
  ...crudResolvers,
  associations: associations,
  transformers: transformers,
  ResolverFactory: ResolverFactory,
  Association: Association,
  ChildAssociation: ChildAssociation,
  ParentAssociation: ParentAssociation
};
