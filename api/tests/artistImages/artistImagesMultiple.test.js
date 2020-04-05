const test = require("ava");
const {
  createArtistImagesFunction,
  artistImagesResolvers,
} = require("./_shared");

test("should return a list of records", async (t) => {
  await createArtistImagesFunction()();

  let artistImagesList = await artistImagesResolvers.queries.artistImagesMultiple();

  t.true(artistImagesList.length > 0);
  t.true(artistImagesList instanceof Array);
  t.truthy(artistImagesList[0].id);
});
