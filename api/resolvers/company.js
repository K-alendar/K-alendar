const { companyFactory } = require("./factories");

module.exports = {
  types: {
    Company: companyFactory.subresolvers()
  },

  queries: {
    companies: companyFactory.all(),
    company: companyFactory.one()
  },

  mutations: {
    createCompany: companyFactory.create(),
    updateCompany: companyFactory.update(),
    deleteCompany: companyFactory.destroy()
  }
};
