const { Company, Artist } = require("../database/models");
const { create, all, destroy, update, one, associations } = require("./utils");

module.exports = {
  types: {
    Company: {
      ...associations.has("artists"),
  
    }
  },

  queries: {
    companies: all(Company),
    company: one(Company)
  },

  mutations: {
    createCompany: create(Company),
    updateCompany: update(Company),
    deleteCompany: destroy(Company)
  }
};
