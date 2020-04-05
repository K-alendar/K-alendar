const test = require("ava");

const errors = require("../../resolvers/_errors");
const {
  fakeArtist,
  createArtistFunction,
  updateArtistFunction,
  artistResolvers,
} = require("./_shared");
const { fakeArtistImages } = require("../artistImages/_shared");
const { fakeSocialLinks } = require("../socialLinks/_shared");

test("with valid params succedes", async (t) => {
  let persistedArtist = await createArtistFunction()();

  let artist = await updateArtistFunction(persistedArtist.id)();

  t.truthy(artist.id);
  t.truthy(artist.displayName);
  t.true(artist.updatedAt > persistedArtist.updatedAt);
});

test("with an invalid startDate fails", async (t) => {
  let persistedArtist = await createArtistFunction()();

  let error = await t.throwsAsync(
    updateArtistFunction(persistedArtist.id, {
      overrides: { startDate: "bgsyuaibhjdsabj" },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Start date must be a valid date/);

  error = await t.throwsAsync(
    updateArtistFunction(persistedArtist.id, { overrides: { startDate: "" } }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Start date can't be blank/);
});

test("with an invalid endDate fails", async (t) => {
  let persistedArtist = await createArtistFunction()();

  let error = await t.throwsAsync(
    updateArtistFunction(persistedArtist.id, {
      overrides: { endDate: "bgsyuaibhjdsabj" },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /End date must be a valid date/);
});

test("with an invalid description fails", async (t) => {
  let persistedArtist = await createArtistFunction()();

  let error = await t.throwsAsync(
    updateArtistFunction(persistedArtist.id, {
      overrides: { description: 567812 },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Description must be of type string/);
});

test("with an invalid displayName fails", async (t) => {
  let persistedArtist = await createArtistFunction()();

  let error = await t.throwsAsync(
    updateArtistFunction(persistedArtist.id, {
      overrides: { displayName: "" },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Display name can't be blank/);

  error = await t.throwsAsync(
    updateArtistFunction(persistedArtist.id, {
      overrides: { displayName: 1256789 },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Display name must be of type string/);
});

test("with an invalid secondaryDisplayName fails", async (t) => {
  let persistedArtist = await createArtistFunction()();

  let error = await t.throwsAsync(
    updateArtistFunction(persistedArtist.id, {
      overrides: { secondaryDisplayName: "" },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Secondary display name can't be blank/);

  error = await t.throwsAsync(
    updateArtistFunction(persistedArtist.id, {
      overrides: { secondaryDisplayName: 567812 },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Secondary display name must be of type string/);
});

test("with an invalid isGroup fails", async (t) => {
  let persistedArtist = await createArtistFunction()();

  let error = await t.throwsAsync(
    updateArtistFunction(persistedArtist.id, {
      overrides: { isGroup: "yes it's a group" },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Is group must be of type boolean/);
});

test("with images should create a child model", async (t) => {
  let persistedArtist = await createArtistFunction()();

  let artistAttributes = fakeArtist();
  artistAttributes.images = fakeArtistImages().artistImages;

  let artist = await artistResolvers.mutations.updateArtist(null, {
    id: persistedArtist.id,
    ...artistAttributes,
  });

  t.truthy(artist.images);
  t.truthy(artist.images.banner);
  t.is(artistAttributes.images.cardTall, artist.images.cardTall);
});

test("with invalid images should fail validation", async (t) => {
  let persistedArtist = await createArtistFunction()();

  let artistAttributes = fakeArtist();
  artistAttributes.images = fakeArtistImages({
    overrides: { banner: "definitely not a url!" },
  }).artistImages;

  let error = await t.throwsAsync(
    async () => {
      await artistResolvers.mutations.updateArtist(null, {
        id: persistedArtist.id,
        ...artistAttributes,
      });
    },
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Banner is not a valid url/);
});

test("with socialLinks should create a child model", async (t) => {
  let persistedArtist = await createArtistFunction()();

  let artistAttributes = fakeArtist();
  artistAttributes.socialLinks = fakeSocialLinks().socialLinks;

  let artist = await artistResolvers.mutations.updateArtist(null, {
    id: persistedArtist.id,
    ...artistAttributes,
  });

  t.truthy(artist.socialLinks);
  t.truthy(artist.socialLinks.twitter);
  t.is(artistAttributes.socialLinks.youtube, artist.socialLinks.youtube);
});

test("with invalid socialLinks should fail validation", async (t) => {
  let persistedArtist = await createArtistFunction()();

  let artistAttributes = fakeArtist();
  artistAttributes.socialLinks = fakeSocialLinks({
    overrides: { youtube: "like and subscribe" },
  }).socialLinks;

  let error = await t.throwsAsync(
    async () => {
      await artistResolvers.mutations.updateArtist(null, {
        id: persistedArtist.id,
        ...artistAttributes,
      });
    },
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Youtube is not a valid url/);
});
