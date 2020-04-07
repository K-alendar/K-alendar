const test = require("ava");
const faker = require("faker");
const errors = require("../../resolvers/_errors");
const { createArtistImagesFunction } = require("./_shared");

test("with valid params succedes", async (t) => {
  let artistImages = await createArtistImagesFunction()();

  t.truthy(artistImages.id);
  t.truthy(artistImages.banner);
});

test("with an invalid icon fails", async (t) => {
  let error = await t.throwsAsync(
    createArtistImagesFunction({ overrides: { icon: "icon.jpg" } }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Icon is not a valid url/);

  error = await t.throwsAsync(
    createArtistImagesFunction({
      overrides: { icon: faker.random.alphaNumeric(256) },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Icon is too long/);
});

test("with an invalid banner fails", async (t) => {
  let error = await t.throwsAsync(
    createArtistImagesFunction({ overrides: { banner: "banner.jpg" } }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Banner is not a valid url/);

  error = await t.throwsAsync(
    createArtistImagesFunction({
      overrides: { banner: faker.random.alphaNumeric(256) },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Banner is too long/);
});

test("with an invalid cardTall fails", async (t) => {
  let error = await t.throwsAsync(
    createArtistImagesFunction({ overrides: { cardTall: "cardTall.jpg" } }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Card tall is not a valid url/);

  error = await t.throwsAsync(
    createArtistImagesFunction({
      overrides: { cardTall: faker.random.alphaNumeric(256) },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Card tall is too long/);
});

test("with an invalid cardFlat fails", async (t) => {
  let error = await t.throwsAsync(
    createArtistImagesFunction({ overrides: { cardFlat: "cardFlat.jpg" } }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Card flat is not a valid url/);

  error = await t.throwsAsync(
    createArtistImagesFunction({
      overrides: { cardFlat: faker.random.alphaNumeric(256) },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Card flat is too long/);
});
