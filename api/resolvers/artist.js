const {
  Artist,
  Company,
  ArtistImages,
  SocialLinks
} = require("../database/models");
const { create, all, destroy, update, one, _transformers } = require("./utils");

const artistIncludes = [
  { model: Company, as: "company" },
  { model: ArtistImages, as: "images" },
  { model: SocialLinks, as: "socialLinks" },
  { model: Artist, as: "groups", through: "GroupMembers" },
  { model: Artist, as: "members", through: "GroupMembers" }
];

const artistTransformers = _transformers.multi(
  _transformers.parseDate("startDate"),
  _transformers.parseDate("endDate")
);

module.exports = {
  types: {},

  queries: {
    artists: all(Artist, artistIncludes),
    artist: one(Artist, artistIncludes)
  },

  mutations: {
    createArtist: create(Artist, artistIncludes, artistTransformers),
    updateArtist: update(Artist, artistIncludes, artistTransformers),
    deleteArtist: destroy(Artist),
    createArtistWithImages: async (_, values) => {
      let newValues = Object.assign({}, values);
      delete newValues.icon;
      delete newValues.banner;
      delete newValues.cardTall;
      delete newValues.cardFlat;
      let artist = await create(
        Artist,
        artistIncludes,
        artistTransformers
      )(_, values);
      await update(ArtistImages)(_, {
        id: artist.images.id,
        icon: values.icon,
        banner: values.banner,
        cardTall: values.cardTall,
        cardFlat: values.cardFlat
      });
      return await one(Artist, artistIncludes)(_, { id: artist.id });
    }
  }
};
