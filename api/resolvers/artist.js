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
  {
    model: Artist,
    as: "groups",
    through: "GroupMembers",
    include: [{ model: ArtistImages, as: "images" }]
  },
  {
    model: Artist,
    as: "members",
    through: "GroupMembers",
    include: [{ model: ArtistImages, as: "images" }]
  }
];

const artistTransformers = _transformers.multi(
  _transformers.parseDate("startDate"),
  _transformers.parseDate("endDate")
);

module.exports = {
  types: {},

  queries: {
    artists: all(Artist, { include: artistIncludes }),
    artist: one(Artist, { include: artistIncludes })
  },

  mutations: {
    createArtist: create(Artist, {
      include: artistIncludes,
      transformer: artistTransformers
    }),
    updateArtist: update(Artist, {
      include: artistIncludes,
      transformer: artistTransformers
    }),
    deleteArtist: destroy(Artist),
    createArtistWithImages: async (_, values) => {
      let newValues = Object.assign({}, values);
      delete newValues.icon;
      delete newValues.banner;
      delete newValues.cardTall;
      delete newValues.cardFlat;
      let artist = await create(Artist, {
        include: artistIncludes,
        transformer: artistTransformers
      })(_, values);
      await update(ArtistImages)(_, {
        id: artist.images.id,
        icon: values.icon,
        banner: values.banner,
        cardTall: values.cardTall,
        cardFlat: values.cardFlat
      });
      return await one(Artist, { include: artistIncludes })(_, {
        id: artist.id
      });
    }
  }
};
