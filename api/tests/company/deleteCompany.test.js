const test = require("ava");
const errors = require("../../resolvers/_errors");
const {
  createCompanyFunction,
  deleteCompanyFunction,
  companyResolvers,
} = require("./_shared");

test("deletes a company", async (t) => {
  let persistedCompany = await createCompanyFunction()();

  await companyResolvers.mutations.deleteCompany(null, {
    id: persistedCompany.id,
  });

  await t.throwsAsync(deleteCompanyFunction(persistedCompany.id), {
    instanceOf: errors.RecordNotFoundError,
  });
});

test("with nonexistent record fails", async (t) => {
  await t.throwsAsync(deleteCompanyFunction(-1), {
    instanceOf: errors.RecordNotFoundError,
  });
});
