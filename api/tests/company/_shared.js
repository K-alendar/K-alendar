const faker = require("faker");
const companyResolvers = require("../../resolvers/company");

function fakeCompany({ overrides = {}, attributes } = {}) {
  let company = {
    company: Object.assign(
      {
        name: faker.company.companyName() + " " + Date.now(),
      },
      overrides
    ),
  };
  if (!attributes) {
    return company;
  }
  return Object.keys(company.company).reduce((acc, key) => {
    if (attributes.includes(key)) {
      acc.company[key] = company.company[key];
    }
    return acc;
  }, {});
}

function createCompanyFunction({ overrides, attributes } = {}) {
  return async () => {
    return await companyResolvers.mutations.createCompany(
      null,
      fakeCompany({ overrides: overrides, attributes: attributes })
    );
  };
}

function updateCompanyFunction(id, { overrides, attributes } = {}) {
  return async () => {
    return await companyResolvers.mutations.updateCompany(null, {
      id: id,
      ...fakeCompany({ overrides: overrides, attributes: attributes }),
    });
  };
}

function deleteCompanyFunction(id) {
  return async () => {
    return await companyResolvers.mutations.deleteCompany(null, { id: id });
  };
}

function getOneCompanyFunction(id) {
  return async () => {
    return await companyResolvers.queries.company(null, { id: id });
  };
}

module.exports = {
  companyResolvers,
  fakeCompany,
  createCompanyFunction,
  updateCompanyFunction,
  deleteCompanyFunction,
  getOneCompanyFunction,
};
