const test = require("ava");
const faker = require("faker");
const errors = require("../../resolvers/_errors");
const {
  fakeCompany,
  createCompanyFunction,
  companyResolvers,
} = require("./_shared");

test("with valid params succedes", async (t) => {
  let company = await createCompanyFunction()();

  t.truthy(company.id);
  t.truthy(company.name);
});

test("with an invalid name fails", async (t) => {
  let error = await t.throwsAsync(
    createCompanyFunction({ overrides: { name: "" } }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Name can't be blank/);

  error = await t.throwsAsync(
    createCompanyFunction({
      overrides: { name: faker.random.alphaNumeric(256) },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Name is too long/);
});

test("with non unique name fails", async (t) => {
  await createCompanyFunction({
    overrides: { name: "Testing Create Company" },
  })();

  const error = await t.throwsAsync(
    createCompanyFunction({ overrides: { name: "Testing Create Company" } }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /name must be unique/);
});
