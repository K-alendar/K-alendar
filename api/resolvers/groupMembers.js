const { GroupMember, Artist } = require("../database/models");
const { create, all, destroy, update, one, associations } = require("./utils");

// Something in the self-referencial many to many relationship breaks select queries
// and doesn't return the primary key
// this can be fixed by explicitly asking for it, hence the override
const groupMemberForceFields = ["id", "groupId", "memberId"];

module.exports = {
  types: {
    GroupMember: {
      ...associations.hasA("member"),
      ...associations.hasA("group")
    }
  },

  queries: {
    groupMembers: all(GroupMember, {
      __forceSelectFields: groupMemberForceFields
    }),
    groupMember: one(GroupMember, {
      __forceSelectFields: groupMemberForceFields
    })
  },

  mutations: {
    addMemberToGroup: create(GroupMember, {
      __forceSelectFields: groupMemberForceFields
    }),
    updateMemberInGroup: update(GroupMember, {
      __forceSelectFields: groupMemberForceFields
    }),
    removeMemberFromGroup: destroy(GroupMember)
  }
};
