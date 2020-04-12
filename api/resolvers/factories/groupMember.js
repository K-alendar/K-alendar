const { GroupMember } = require("../../database/models");
const { ResolverFactory, ChildAssociation } = require("../utils");

// Something in the self-referencial many to many relationship breaks select queries
// and doesn't return the primary key
// this can be fixed by explicitly asking for it, hence the override
const groupMemberForceFields = [
  "id",
  "groupId",
  "memberId",
  "createdAt",
  "updatedAt",
];

const associations = [
  new ChildAssociation("member"),
  new ChildAssociation("group"),
];

const computedProperties = {
  isActive: async (groupMember) => {
    let group = groupMember.getGroup();

    if (!group) {
      return false;
    }

    if (!group.endDate) {
      return true
    }

    return group.endDate > Date.now()
  },
};

module.exports = new ResolverFactory(GroupMember, {
  fromObject: "groupMember",
  associations: associations,
  __forceSelectFields: groupMemberForceFields,
  computedProperties: computedProperties,
  validations: {
    memberId: { presence: { allowEmpty: false } },
    groupId: { presence: { allowEmpty: false } },
  },
});
