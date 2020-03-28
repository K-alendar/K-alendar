const { Company, Artist } = require("../database/models");
const { create, all, destroy, update, one } = require("./utils");

const companyIncludes = [{ model: Artist, as: "artists" }];

module.exports = {
  types: {},

  queries: {
    companies: all(Company, { include: companyIncludes }),
    company: one(Company, { include: companyIncludes })
  },

  mutations: {
    createCompany: create(Company, { include: companyIncludes }),
    updateCompany: update(Company, { include: companyIncludes }),
    deleteCompany: destroy(Company)
  }
};
