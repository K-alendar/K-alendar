const faker = require("faker");
const artistResolvers = require("../../resolvers/artist");

function genKoreanName() {
  faker.locale = "ko";
  let name = faker.name.lastName() + faker.name.firstName();
  faker.locale = "en";
  return name;
}

function fakeArtist({ overrides = {}, attributes } = {}) {
  let artist = {
    artist: Object.assign(
      {
        startDate: faker.date.past(5),
        description: faker.lorem.sentences(),
        displayName: faker.name.firstName(),
        secondaryDisplayName: genKoreanName(),
        isGroup: false
      },
      overrides
    ),
  };
  if (!attributes) {
    return artist;
  }
  return Object.keys(artist.artist).reduce((acc, key) => {
    if (attributes.includes(key)) {
      acc.artist[key] = artist.artist[key];
    }
    return acc;
  }, {});
}

function createArtistFunction({ overrides, attributes } = {}) {
  return async () => {
    return await artistResolvers.mutations.createArtist(
      null,
      fakeArtist({ overrides: overrides, attributes: attributes })
    );
  };
}

function updateArtistFunction(id, { overrides, attributes } = {}) {
  return async () => {
    return await artistResolvers.mutations.updateArtist(null, {
      id: id,
      ...fakeArtist({ overrides: overrides, attributes: attributes }),
    });
  };
}

function deleteArtistFunction(id) {
  return async () => {
    return await artistResolvers.mutations.deleteArtist(null, { id: id });
  };
}

function getOneArtistFunction(id) {
  return async () => {
    return await artistResolvers.queries.artist(null, { id: id });
  };
}

module.exports = {
  artistResolvers,
  fakeArtist,
  createArtistFunction,
  updateArtistFunction,
  deleteArtistFunction,
  getOneArtistFunction,
};
