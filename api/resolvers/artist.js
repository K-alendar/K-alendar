const {
  Artist,
  Company,
  GroupMember,
  NewModel
} = require("../database/models");
const { createAndReturn } = require("./utils");

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
      // See findAll -> include for what include means in the sequelize docs
      Artist.findAll({
        include: [
          { model: Company, as: "company" },
          { model: Artist, as: "members", through: "GroupMembers" },
          { model: Artist, as: "groups", through: "GroupMembers" }
        ]
      }),
    groupMembers: () => GroupMember.findAll()
  },

  mutations: {
    createArtist: createAndReturn(Artist, [{ model: Company, as: "company" }]),
    addMemberToGroup: createAndReturn(GroupMember, [
      { model: Artist, as: "member" },
      { model: Artist, as: "group" }
    ])
  }
};
