const test = require("ava");
const errors = require("../../resolvers/_errors");
const {
  createCompanyFunction,
  getOneCompanyFunction,
  companyResolvers,
} = require("./_shared");
const { createArtistFunction } = require("../artist/_shared");

test("of artists should return a list of artists", async (t) => {
  let persistedCompany = await createCompanyFunction()();
  let persistedArtist = await createArtistFunction({
    overrides: { companyId: persistedCompany.id },
  })();

  let company = await getOneCompanyFunction(persistedCompany.id)();
  let artists = await companyResolvers.types.Company.artists(company);

  t.true(artists instanceof Array);
  t.true(artists[0].id === persistedArtist.id);
});
