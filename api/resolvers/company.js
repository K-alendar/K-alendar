const { Company, Artist } = require("../database/models");
const { create, all, destroy, update, one } = require("./utils");

const companyIncludes = [{ model: Artist, as: "artists" }];

module.exports = {
  types: {},

  queries: {
    companies: all(Company, companyIncludes),
    company: one(Company, companyIncludes)
  },

  mutations: {
    createCompany: create(Company, companyIncludes),
    updateCompany: update(Company, companyIncludes),
    deleteCompany: destroy(Company),
  }
};
