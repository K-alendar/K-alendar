const test = require("ava");
const errors = require("../../resolvers/_errors");
const {
  createSocialLinksFunction,
  updateSocialLinksFunction,
} = require("./_shared");

test("with valid params succedes", async (t) => {
  let persistedSocialLinks = await createSocialLinksFunction()();

  let socialLinks = await updateSocialLinksFunction(persistedSocialLinks.id)();

  t.truthy(socialLinks.id);
  t.truthy(socialLinks.twitter);
  t.true(socialLinks.updatedAt > persistedSocialLinks.updatedAt);
});

test("with an invalid youtube fails", async (t) => {
  let persistedSocialLinks = createSocialLinksFunction()();

  const error = await t.throwsAsync(
    updateSocialLinksFunction(persistedSocialLinks.id, {
      overrides: { youtube: "youtube link" },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Youtube is not a valid url/);
});

test("with an invalid twitter fails", async (t) => {
  let persistedSocialLinks = createSocialLinksFunction()();

  const error = await t.throwsAsync(
    updateSocialLinksFunction(persistedSocialLinks.id, {
      overrides: { twitter: "twitter link" },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Twitter is not a valid url/);
});

test("with an invalid spotify fails", async (t) => {
  let persistedSocialLinks = createSocialLinksFunction()();

  const error = await t.throwsAsync(
    updateSocialLinksFunction(persistedSocialLinks.id, {
      overrides: { youtube: "youtube link" },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Youtube is not a valid url/);
});
