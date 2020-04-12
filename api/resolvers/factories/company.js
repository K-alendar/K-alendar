const { Company, Artist } = require("../../database/models");
const { ResolverFactory, ChildAssociation } = require("../utils");

const associations = [new ChildAssociation("artists")];

const computedProperties = {
  artistCount: async (company) => {
    return Artist.count({
      where: { companyId: company.id }
    })
  }
}

module.exports = new ResolverFactory(Company, {
  fromObject: "company",
  associations: associations,
  computedProperties: computedProperties,
  validations: {
    name: { presence: { allowEmpty: false }, length: { maximum: 255 } },
  },
});
