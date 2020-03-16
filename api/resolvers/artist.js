const { Artist, Company, GroupMember } = require("../database/models");

module.exports = {
  types: {
    Artist: {
      __resolveType(obj, context, info) {
        if (obj.isGroup) {
          return "Group";
        } else {
          return "Soloist";
        }
      }
    },

    IArtist: {
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
    artists: () =>
      Artist.findAll({
        include: [
          { model: Company, as: "company" },
          { model: Artist, as: "members", through: "GroupMembers" },
          { model: Artist, as: "groups", through: "GroupMembers" }
        ]
      })
  },

  mutations: {
    createArtist: async (_, values) =>
      await Artist.create(values, {
        include: { model: Company, as: "company" }
      }),

    addMemberToGroup: async (_, values) =>
      await GroupMember.create(values, {
        include: [
          { model: Artist, as: "member" },
          { model: Artist, as: "group" }
        ]
      })
  }
};
