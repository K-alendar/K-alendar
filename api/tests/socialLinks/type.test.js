const test = require("ava");
const {
  createSocialLinksFunction,
  socialLinksResolvers,
} = require("./_shared");
const { createArtistFunction } = require("../artist/_shared");

test("of artist should return an artist", async (t) => {
  let presistedArtist = await createArtistFunction()();
  let socialLinks = await createSocialLinksFunction({
    overrides: { artistId: presistedArtist.id },
  })();

  let artist = await socialLinksResolvers.types.SocialLinks.artist(socialLinks);

  t.truthy(artist.id);
  t.truthy(artist.displayName);
  t.is(artist.id, presistedArtist.id);
});
