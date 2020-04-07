const test = require("ava");
const faker = require("faker");
const errors = require("../../resolvers/_errors");
const {
  fakeArtist,
  createArtistFunction,
  artistResolvers,
} = require("./_shared");
const { fakeArtistImages } = require("../artistImages/_shared");
const { fakeSocialLinks } = require("../socialLinks/_shared");

test("with valid params succedes", async (t) => {
  let artist = await artistResolvers.mutations.createArtist(null, fakeArtist());

  t.truthy(artist.id);
  t.truthy(artist.displayName);
});

test("with an invalid startDate fails", async (t) => {
  let error = await t.throwsAsync(
    createArtistFunction({ overrides: { startDate: "bgsyuaibhjdsabj" } }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Start date must be a valid date/);

  error = await t.throwsAsync(
    createArtistFunction({ overrides: { startDate: "" } }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Start date can't be blank/);
});

test("with an invalid endDate fails", async (t) => {
  let error = await t.throwsAsync(
    createArtistFunction({ overrides: { endDate: "bgsyuaibhjdsabj" } }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /End date must be a valid date/);
});

test("with an invalid description fails", async (t) => {
  let error = await t.throwsAsync(
    createArtistFunction({ overrides: { description: 567812 } }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Description must be of type string/);
});

test("with an invalid displayName fails", async (t) => {
  let error = await t.throwsAsync(
    createArtistFunction({ overrides: { displayName: "" } }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Display name can't be blank/);

  error = await t.throwsAsync(
    createArtistFunction({ overrides: { displayName: 1256789 } }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Display name must be of type string/);

  error = await t.throwsAsync(
    createArtistFunction({
      overrides: { displayName: faker.random.alphaNumeric(256) },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Display name is too long/);
});

test("with an invalid secondaryDisplayName fails", async (t) => {
  let error = await t.throwsAsync(
    createArtistFunction({ overrides: { secondaryDisplayName: "" } }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Secondary display name can't be blank/);

  error = await t.throwsAsync(
    createArtistFunction({ overrides: { secondaryDisplayName: 567812 } }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Secondary display name must be of type string/);

  error = await t.throwsAsync(
    createArtistFunction({
      overrides: { secondaryDisplayName: faker.random.alphaNumeric(256) },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Secondary display name is too long/);
});

test("with an invalid isGroup fails", async (t) => {
  let error = await t.throwsAsync(
    createArtistFunction({ overrides: { isGroup: "yes it's a group" } }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Is group must be of type boolean/);
});

test("with images should create a child model", async (t) => {
  let artistAttributes = fakeArtist();
  artistAttributes.images = fakeArtistImages().artistImages;

  let artist = await artistResolvers.mutations.createArtist(
    null,
    artistAttributes
  );

  t.truthy(artist.images);
  t.truthy(artist.images.banner);
  t.is(artistAttributes.images.cardTall, artist.images.cardTall);
});

test("with invalid images should fail validation", async (t) => {
  let artistAttributes = fakeArtist();
  artistAttributes.images = fakeArtistImages({
    overrides: { banner: "definitely not a url!" },
  }).artistImages;

  let error = await t.throwsAsync(
    async () => {
      await artistResolvers.mutations.createArtist(null, artistAttributes);
    },
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Banner is not a valid url/);
});

test("with socialLinks should create a child model", async (t) => {
  let artistAttributes = fakeArtist();
  artistAttributes.socialLinks = fakeSocialLinks().socialLinks;

  let artist = await artistResolvers.mutations.createArtist(
    null,
    artistAttributes
  );

  t.truthy(artist.socialLinks);
  t.truthy(artist.socialLinks.twitter);
  t.is(artistAttributes.socialLinks.youtube, artist.socialLinks.youtube);
});

test("with invalid socialLinks should fail validation", async (t) => {
  let artistAttributes = fakeArtist();
  artistAttributes.socialLinks = fakeSocialLinks({
    overrides: { youtube: "like and subscribe" },
  }).socialLinks;

  let error = await t.throwsAsync(
    async () => {
      await artistResolvers.mutations.createArtist(null, artistAttributes);
    },
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Youtube is not a valid url/);
});

test("with multiple formats of date", async (t) => {
  let artist = await createArtistFunction({
    overrides: { startDate: 1534204800 },
  })();

  t.truthy(artist.startDate);
  t.true(artist.startDate instanceof Date);

  artist = await createArtistFunction({
    overrides: { startDate: "2001-08-14" },
  })();

  t.truthy(artist.startDate);
  t.true(artist.startDate instanceof Date);
});
