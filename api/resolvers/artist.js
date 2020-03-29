const { Artist, ArtistImages } = require("../database/models");
const {
  create,
  all,
  destroy,
  update,
  one,
  transformers,
  associations
} = require("./utils");

const artistTransformers = transformers.multi(
  transformers.parseDate("startDate"),
  transformers.parseDate("endDate")
);

module.exports = {
  types: {
    Artist: {
      ...associations.belongsToA("company"),
      ...associations.has("socialLinks"),
      ...associations.has("images"),
      ...associations.has("members"),
      ...associations.has("groups")
    }
  },

  queries: {
    artists: all(Artist),
    artist: one(Artist)
  },

  mutations: {
    createArtist: create(Artist, { transformer: artistTransformers }),
    updateArtist: update(Artist, { transformer: artistTransformers }),
    deleteArtist: destroy(Artist),
    createArtistWithImages: async (_, values) => {
      let newValues = Object.assign({}, values);
      delete newValues.icon;
      delete newValues.banner;
      delete newValues.cardTall;
      delete newValues.cardFlat;
      let artist = await create(Artist, {
        transformer: artistTransformers,
        include: [{ model: ArtistImages, as: "images" }]
      })(_, values);
      await update(ArtistImages)(_, {
        id: artist.images.id,
        icon: values.icon,
        banner: values.banner,
        cardTall: values.cardTall,
        cardFlat: values.cardFlat
      });
      return await one(Artist)(_, {
        id: artist.id
      });
    }
  }
};
