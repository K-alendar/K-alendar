const test = require("ava");
const errors = require("../../resolvers/_errors");
const {
  createCompanyFunction,
  getOneCompanyFunction,
  companyResolvers,
} = require("./_shared");

test("should return a record", async (t) => {
  let persistedCompany = await createCompanyFunction()();

  let company = await getOneCompanyFunction(persistedCompany.id)();

  t.truthy(company.id);
  t.true(company.name === persistedCompany.name);
});

test("with nonexistent record fails", async (t) => {
  await t.throwsAsync(getOneCompanyFunction(-1), {
    instanceOf: errors.RecordNotFoundError,
  });
});
