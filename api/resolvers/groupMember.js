const { groupMemberFactory } = require("./factories");

module.exports = {
  types: {
    GroupMember: groupMemberFactory.associations(),
  },

  queries: {
    groupMembers: groupMemberFactory.all(),
    groupMember: groupMemberFactory.one(),
  },

  mutations: {
    addMemberToGroup: groupMemberFactory.create(),
    updateMemberInGroup: groupMemberFactory.update(),
    removeMemberFromGroup: groupMemberFactory.destroy(),
  },
};
