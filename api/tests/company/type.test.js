const test = require("ava");
const errors = require("../../resolvers/_errors");
const {
  createCompanyFunction,
  getOneCompanyFunction,
  companyResolvers,
} = require("./_shared");

test.todo("Add artist creation to types.Company.artists")
test("of artists should return a list of artists", async (t) => {
  let persistedCompany = await createCompanyFunction()();

  let company = await getOneCompanyFunction(persistedCompany.id)();
  let artists = await companyResolvers.types.Company.artists(company)

  t.true(artists instanceof Array);
});
