const test = require("ava");
const {
  createSocialLinksFunction,
  socialLinksResolvers,
} = require("./_shared");

test("should return a list of records", async (t) => {
  await createSocialLinksFunction()();

  let socialLinksList = await socialLinksResolvers.queries.socialLinksMultiple();

  t.true(socialLinksList.length > 0);
  t.true(socialLinksList instanceof Array);
  t.truthy(socialLinksList[0].id);
});
