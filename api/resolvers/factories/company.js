const { Company } = require("../../database/models");
const { ResolverFactory, ChildAssociation } = require("../utils");

const associations = [new ChildAssociation("artists")];

module.exports = new ResolverFactory(Company, {
  fromObject: "company",
  associations: associations,
  validations: {
    name: { presence: { allowEmpty: false } }
  }
});
