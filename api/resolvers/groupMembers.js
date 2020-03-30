const { GroupMember } = require("../database/models");
const {
  ResolverFactory,
  ChildAssociation
} = require("./utils");

// Something in the self-referencial many to many relationship breaks select queries
// and doesn't return the primary key
// this can be fixed by explicitly asking for it, hence the override
const groupMemberForceFields = ["id", "groupId", "memberId"];

const associations = [
  new ChildAssociation("member"),
  new ChildAssociation("group")
];

const generator = new ResolverFactory(GroupMember, {
  fromObject: "groupMember",
  associations: associations,
  __forceSelectFields: groupMemberForceFields
});

module.exports = {
  types: {
    GroupMember: generator.associations()
  },

  queries: {
    groupMembers: generator.all(),
    groupMember: generator.one()
  },

  mutations: {
    addMemberToGroup: generator.create(),
    updateMemberInGroup: generator.update(),
    removeMemberFromGroup: generator.destroy()
  }
};
