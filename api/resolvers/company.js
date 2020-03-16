const { Company, Artist } = require("../database/models");

module.exports = {
  types: {},

  queries: {
    companies: () =>
      Company.findAll({ include: { model: Artist, as: "artists" } })
  },

  mutations: {
    createCompany: async (_, values) => await Company.create(values)
  }
};
