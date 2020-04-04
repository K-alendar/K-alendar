const faker = require("faker");
const test = require("ava");

const companyResolvers = require("../../resolvers/company");
const errors = require("../../resolvers/_errors");

function fakeCompany(overrides = {}) {
  return {
    company: Object.assign(
      {
        name: faker.company.companyName(),
      },
      overrides
    ),
  };
}

function createCompany(overrides = {}) {
  return async () => {
    await companyResolvers.mutations.createCompany(
      null,
      fakeCompany(overrides)
    );
  };
}

test("with valid params succedes", async (t) => {
  let company = await companyResolvers.mutations.createCompany(
    "",
    fakeCompany()
  );

  t.truthy(company.id);
  t.truthy(company.name);
});

test("with an invalid name fails", async (t) => {
  t.plan(2);

  const error = await t.throwsAsync(createCompany({ name: "" }), {
    instanceOf: errors.ValidationError,
  });
  t.regex(error.message, /Name can't be blank/);
});
