const test = require("ava");
const errors = require("../../resolvers/_errors");
const {
  createCompanyFunction,
  companyResolvers,
} = require("./_shared");

test("should return a list record", async (t) => {
  await createCompanyFunction()();

  let companies = await companyResolvers.queries.companies()

  t.true(companies.length > 0);
  t.truthy(companies[0].id)
});
