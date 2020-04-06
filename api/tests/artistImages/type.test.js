const test = require("ava");
const {
  createArtistImagesFunction,
  artistImagesResolvers,
} = require("./_shared");
const { createArtistFunction } = require("../artist/_shared");

test("of artist should return an artist", async (t) => {
  let presistedArtist = await createArtistFunction()();
  let artistImages = await createArtistImagesFunction({
    overrides: { artistId: presistedArtist.id },
  })();

  let artist = await artistImagesResolvers.types.ArtistImages.artist(
    artistImages
  );

  t.truthy(artist.id);
  t.truthy(artist.displayName);
  t.is(artist.id, presistedArtist.id);
});
