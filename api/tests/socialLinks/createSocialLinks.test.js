const test = require("ava");
const faker = require("faker")
let errors = require("../../resolvers/_errors");
const { createSocialLinksFunction } = require("./_shared");

test("with valid params succedes", async (t) => {
  let socialLinks = await createSocialLinksFunction()();

  t.truthy(socialLinks.id);
  t.truthy(socialLinks.youtube);
});

test("with an invalid youtube fails", async (t) => {
  let error = await t.throwsAsync(
    createSocialLinksFunction({ overrides: { youtube: "youtube link" } }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Youtube is not a valid url/);
  
  error = await t.throwsAsync(
    createSocialLinksFunction({
      overrides: { youtube: faker.random.alphaNumeric(256) },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Youtube is too long/);
});

test("with an invalid twitter fails", async (t) => {
  let error = await t.throwsAsync(
    createSocialLinksFunction({ overrides: { twitter: "twitter link" } }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Twitter is not a valid url/);
  
  error = await t.throwsAsync(
    createSocialLinksFunction({
      overrides: { twitter: faker.random.alphaNumeric(256) },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Twitter is too long/);
});

test("with an invalid spotify fails", async (t) => {
  let error = await t.throwsAsync(
    createSocialLinksFunction({ overrides: { spotify: "spotify link" } }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Spotify is not a valid url/);
  
  error = await t.throwsAsync(
    createSocialLinksFunction({
      overrides: { spotify: faker.random.alphaNumeric(256) },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Spotify is too long/);
});

