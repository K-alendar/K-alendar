const test = require("ava");
const errors = require("../../resolvers/_errors");
const {
  createArtistImagesFunction,
  deleteArtistImagesFunction,
  artistImagesResolvers,
} = require("./_shared");

test("deletes artistImages", async (t) => {
  let persistedArtistImages = await createArtistImagesFunction()();

  await artistImagesResolvers.mutations.deleteArtistImages(null, {
    id: persistedArtistImages.id,
  });

  await t.throwsAsync(deleteArtistImagesFunction(persistedArtistImages.id), {
    instanceOf: errors.RecordNotFoundError,
  });
});

test("with nonexistent record fails", async (t) => {
  await t.throwsAsync(deleteArtistImagesFunction(-1), {
    instanceOf: errors.RecordNotFoundError,
  });
});
