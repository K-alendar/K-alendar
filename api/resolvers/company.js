const { Company } = require("../database/models");
const { ResolverFactory, ChildAssociation } = require("./utils");

const associations = [new ChildAssociation("artists")];

const generator = new ResolverFactory(Company, {
  fromObject: "company",
  associations: associations
});

module.exports = {
  types: {
    Company: generator.associations()
  },

  queries: {
    companies: generator.all(),
    company: generator.one()
  },

  mutations: {
    createCompany: generator.create(),
    updateCompany: generator.update(),
    deleteCompany: generator.destroy()
  }
};
