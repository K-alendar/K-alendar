const test = require("ava");
const errors = require("../../resolvers/_errors");
const {
  createArtistFunction,
  artistResolvers,
} = require("./_shared");

test("should return a list of records", async (t) => {
  await createArtistFunction()();

  let artists = await artistResolvers.queries.artists()

  t.true(artists.length > 0);
  t.true(artists instanceof Array)
  t.truthy(artists[0].id)
});
