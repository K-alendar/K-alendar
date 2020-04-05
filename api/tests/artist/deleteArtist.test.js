const test = require("ava");
const errors = require("../../resolvers/_errors");
const {
  createArtistFunction,
  deleteArtistFunction,
  artistResolvers,
  fakeArtist,
} = require("./_shared");
const {
  fakeArtistImages,
  artistImagesResolvers,
} = require("../artistImages/_shared");
const {
  fakeSocialLinks,
  socialLinksResolvers,
} = require("../socialLinks/_shared");

test("deletes an artist", async (t) => {
  let persistedArtist = await createArtistFunction()();

  await artistResolvers.mutations.deleteArtist(null, {
    id: persistedArtist.id,
  });

  await t.throwsAsync(deleteArtistFunction(persistedArtist.id), {
    instanceOf: errors.RecordNotFoundError,
  });
});

test("with nonexistent record fails", async (t) => {
  await t.throwsAsync(deleteArtistFunction(-1), {
    instanceOf: errors.RecordNotFoundError,
  });
});

test("deletes an artist and its children", async (t) => {
  let artistAttributes = fakeArtist();
  artistAttributes.images = fakeArtistImages();
  artistAttributes.socialLinks = fakeSocialLinks();

  let persistedArtist = await artistResolvers.mutations.createArtist(
    null,
    artistAttributes
  );

  await artistResolvers.mutations.deleteArtist(null, {
    id: persistedArtist.id,
  });

  await t.throwsAsync(
    artistImagesResolvers.queries.artistImages(null, {
      id: persistedArtist.images.id,
    }),
    {
      instanceOf: errors.RecordNotFoundError,
    }
  );

  await t.throwsAsync(
    socialLinksResolvers.queries.socialLinks(null, {
      id: persistedArtist.socialLinks.id,
    }),
    {
      instanceOf: errors.RecordNotFoundError,
    }
  );
});
