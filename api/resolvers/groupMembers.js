const { GroupMember, Artist } = require("../database/models");
const { create, all, destroy, update, one } = require("./utils");

const groupMemberIncludes = [
  { model: Artist, as: "member" },
  { model: Artist, as: "group" }
];

// Something in the self-referencial many to many relationship breaks select queries
// and doesn't return the primary key
// this can be fixed by explicitly asking for it, hence the override
const groupMemberForceFields = ["id", "groupId", "memberId"];

module.exports = {
  types: {},

  queries: {
    groupMembers: all(GroupMember, {
      include: groupMemberIncludes,
      __forceSelectFields: groupMemberForceFields
    }),
    groupMember: one(GroupMember, {
      inlclude: groupMemberIncludes,
      __forceSelectFields: groupMemberForceFields
    })
  },

  mutations: {
    addMemberToGroup: create(GroupMember, {
      include: groupMemberIncludes,
      __forceSelectFields: groupMemberForceFields
    }),
    updateMemberInGroup: update(GroupMember, {
      include: groupMemberIncludes,
      __forceSelectFields: groupMemberForceFields
    }),
    removeMemberFromGroup: destroy(GroupMember)
  }
};
