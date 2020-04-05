const test = require("ava");
const errors = require("../../resolvers/_errors");
const {
  createSocialLinksFunction,
  getOneSocialLinksFunction,
  socialLinksResolvers,
} = require("./_shared");

test("should return a record", async (t) => {
  let persistedSocialLinks = await createSocialLinksFunction()();

  let socialLinks = await getOneSocialLinksFunction(persistedSocialLinks.id)();

  t.truthy(socialLinks.id);
  t.true(socialLinks.twitter === persistedSocialLinks.twitter);
});

test("with nonexistent record fails", async (t) => {
  await t.throwsAsync(getOneSocialLinksFunction(-1), {
    instanceOf: errors.RecordNotFoundError,
  });
});
