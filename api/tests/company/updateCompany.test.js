const test = require("ava");

const errors = require("../../resolvers/_errors");
const {
  fakeCompany,
  createCompanyFunction,
  updateCompanyFunction,
  companyResolvers,
} = require("./_shared");

test("with valid params succedes", async (t) => {
  let persistedCompany = await createCompanyFunction()();

  let company = await companyResolvers.mutations.updateCompany(null, {
    id: persistedCompany.id,
    ...fakeCompany(),
  });

  t.truthy(company.id);
  t.truthy(company.name);
  t.true(company.updatedAt > persistedCompany.updatedAt);
});

test("with an invalid name fails", async (t) => {
  let persistedCompany = await createCompanyFunction()();

  const error = await t.throwsAsync(
    updateCompanyFunction(persistedCompany.id, { overrides: { name: "" } }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Name can't be blank/);
});

test("with non unique name fails", async (t) => {
  await createCompanyFunction({
    overrides: { name: "Testing Update Company" },
  })();
  let persistedCompany = await createCompanyFunction()();

  const error = await t.throwsAsync(
    updateCompanyFunction(persistedCompany.id, {
      overrides: { name: "Testing Update Company" },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /name must be unique/);
});

test("with nonexistent record fails", async (t) => {
  await t.throwsAsync(updateCompanyFunction(-1, fakeCompany()), {
    instanceOf: errors.RecordNotFoundError,
  });
});
