const { Artist, Company, GroupMember } = require("../database/models");

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
    artists: () =>
      // See findAll -> include for what include means
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
