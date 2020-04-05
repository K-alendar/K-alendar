const test = require("ava");
const errors = require("../../resolvers/_errors");
const { createSocialLinksFunction } = require("./_shared");

test("with valid params succedes", async (t) => {
  let socialLinks = await createSocialLinksFunction()();

  t.truthy(socialLinks.id);
  t.truthy(socialLinks.youtube);
});

test("with an invalid youtube fails", async (t) => {
  const error = await t.throwsAsync(
    createSocialLinksFunction({ overrides: { youtube: "youtube link" } }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Youtube is not a valid url/);
});

test("with an invalid twitter fails", async (t) => {
  const error = await t.throwsAsync(
    createSocialLinksFunction({ overrides: { twitter: "twitter link" } }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Twitter is not a valid url/);
});

test("with an invalid spotify fails", async (t) => {
  const error = await t.throwsAsync(
    createSocialLinksFunction({ overrides: { spotify: "spotify link" } }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Spotify is not a valid url/);
});

