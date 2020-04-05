const test = require("ava");
const errors = require("../../resolvers/_errors");
const {
  createSocialLinksFunction,
  deleteSocialLinksFunction,
  socialLinksResolvers,
} = require("./_shared");

test("deletes socialLinks", async (t) => {
  let persistedSocialLinks = await createSocialLinksFunction()();

  await socialLinksResolvers.mutations.deleteSocialLinks(null, {
    id: persistedSocialLinks.id,
  });

  await t.throwsAsync(deleteSocialLinksFunction(persistedSocialLinks.id), {
    instanceOf: errors.RecordNotFoundError,
  });
});

test("with nonexistent record fails", async (t) => {
  await t.throwsAsync(deleteSocialLinksFunction(-1), {
    instanceOf: errors.RecordNotFoundError,
  });
});
