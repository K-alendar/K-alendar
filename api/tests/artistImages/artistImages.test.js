const test = require("ava");
const errors = require("../../resolvers/_errors");
const {
  createArtistImagesFunction,
  getOneArtistImagesFunction,
  artistImagesResolvers,
} = require("./_shared");

test("should return a record", async (t) => {
  let persistedArtistImages = await createArtistImagesFunction()();

  let artistImages = await getOneArtistImagesFunction(
    persistedArtistImages.id
  )();

  t.truthy(artistImages.id);
  t.true(artistImages.banner === persistedArtistImages.banner);
});

test("with nonexistent record fails", async (t) => {
  await t.throwsAsync(getOneArtistImagesFunction(-1), {
    instanceOf: errors.RecordNotFoundError,
  });
});
