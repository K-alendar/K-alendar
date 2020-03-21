const { Artist, Company, ArtistImages, SocialLinks } = require("../database/models");
const { create, all, destroy, update, one } = require("./utils");

const artistIncludes = [
  { model: Company, as: "company" },
  { model: ArtistImages, as: "images" },
  { model: SocialLinks, as: "socialLinks" },
  { model: Artist, as: "members", through: "GroupMembers" },
  { model: Artist, as: "groups", through: "GroupMembers" }
];

module.exports = {
  types: {
    Artist: {
      // GraphQL needs to know exactly what type something is,
      // So this returns the type of the Artist Union as a string
      __resolveType(obj, context, info) {
        if (obj.isGroup) {
          return "Group";
        } else {
          return "Soloist";
        }
      }
    },

    IArtist: {
      // GraphQL needs to know exactly what type something is,
      // So this returns the type of the Artist Interface as a string
      __resolveType(obj, context, info) {
        if (obj.isGroup) {
          return "Group";
        } else {
          return "Soloist";
        }
      }
    }
  },

  queries: {
    artists: all(Artist, artistIncludes),
    artist: one(Artist, artistIncludes)
  },

  mutations: {
    createArtist: create(Artist, artistIncludes),
    updateArtist: update(Artist, artistIncludes),
    deleteArtist: destroy(Artist)
  }
};
