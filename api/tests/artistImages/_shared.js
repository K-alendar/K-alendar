const faker = require("faker");
const artistImagesResolvers = require("../../resolvers/artistImages");

function fakeArtistImages({ overrides = {}, attributes } = {}) {
  let artistImages = {
    artistImages: Object.assign(
      {
        banner: faker.internet.url(),
        icon: faker.internet.url(),
        cardTall: faker.internet.url(),
        cardFlat: faker.internet.url(),
      },
      overrides
    ),
  };
  if (!attributes) {
    return artistImages;
  }
  return Object.keys(artistImages.artistImages).reduce((acc, key) => {
    if (attributes.includes(key)) {
      acc.artistImages[key] = artistImages.artistImages[key];
    }
    return acc;
  }, {});
}

function createArtistImagesFunction({ overrides, attributes } = {}) {
  return async () => {
    return await artistImagesResolvers.mutations.createArtistImages(
      null,
      fakeArtistImages({ overrides: overrides, attributes: attributes })
    );
  };
}

function updateArtistImagesFunction(id, { overrides, attributes } = {}) {
  return async () => {
    return await artistImagesResolvers.mutations.updateArtistImages(null, {
      id: id,
      ...fakeArtistImages({ overrides: overrides, attributes: attributes }),
    });
  };
}

function deleteArtistImagesFunction(id) {
  return async () => {
    return await artistImagesResolvers.mutations.deleteArtistImages(null, {
      id: id,
    });
  };
}

function getOneArtistImagesFunction(id) {
  return async () => {
    return await artistImagesResolvers.queries.artistImages(null, { id: id });
  };
}

module.exports = {
  artistImagesResolvers,
  fakeArtistImages,
  createArtistImagesFunction,
  updateArtistImagesFunction,
  deleteArtistImagesFunction,
  getOneArtistImagesFunction,
};
