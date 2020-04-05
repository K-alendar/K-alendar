const test = require("ava");
const errors = require("../../resolvers/_errors");
const {
  createArtistImagesFunction,
  updateArtistImagesFunction,
} = require("./_shared");

test("with valid params succedes", async (t) => {
  let persistedArtistImages = await createArtistImagesFunction()();

  let artistImages = await updateArtistImagesFunction(
    persistedArtistImages.id
  )();

  t.truthy(artistImages.id);
  t.truthy(artistImages.cardFlat);
  t.true(artistImages.updatedAt > persistedArtistImages.updatedAt);
});

test("with an invalid icon fails", async (t) => {
  let persistedArtistImages = createArtistImagesFunction()();

  const error = await t.throwsAsync(
    updateArtistImagesFunction(persistedArtistImages.id, {
      overrides: { icon: "icon.jpg" },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Icon is not a valid url/);
});

test("with an invalid banner fails", async (t) => {
  let persistedArtistImages = createArtistImagesFunction()();

  const error = await t.throwsAsync(
    updateArtistImagesFunction(persistedArtistImages.id, {
      overrides: { banner: "banner.jpg" },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Banner is not a valid url/);
});

test("with an invalid cardTall fails", async (t) => {
  let persistedArtistImages = createArtistImagesFunction()();

  const error = await t.throwsAsync(
    updateArtistImagesFunction(persistedArtistImages.id, {
      overrides: { cardTall: "cardTall.jpg" },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Card tall is not a valid url/);
});

test("with an invalid cardFlat fails", async (t) => {
  let persistedArtistImages = createArtistImagesFunction()();

  const error = await t.throwsAsync(
    updateArtistImagesFunction(persistedArtistImages.id, {
      overrides: { cardFlat: "cardFlat.jpg" },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Card flat is not a valid url/);
});
