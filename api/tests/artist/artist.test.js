const test = require("ava");
const errors = require("../../resolvers/_errors");
const { createArtistFunction, getOneArtistFunction } = require("./_shared");

test("should return a record", async (t) => {
  let persistedArtist = await createArtistFunction()();

  let artist = await getOneArtistFunction(persistedArtist.id)();

  t.truthy(artist.id);
  t.is(artist.displayName, persistedArtist.displayName);
});

test("with nonexistent record fails", async (t) => {
  await t.throwsAsync(getOneArtistFunction(-1), {
    instanceOf: errors.RecordNotFoundError,
  });
});
