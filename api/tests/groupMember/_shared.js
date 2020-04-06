const faker = require("faker");
const groupMemberResolvers = require("../../resolvers/groupMember");

function fakeGroupMember({ overrides = {}, attributes } = {}) {
  let groupMember = {
    groupMember: Object.assign(
      {
        groupId: faker.random.number(1000),
        memberId: faker.random.number(1000),
      },
      overrides
    ),
  }
  if (!attributes) {
    return groupMember;
  }
  return Object.keys(groupMember.groupMember).reduce((acc, key) => {
    if (attributes.includes(key)) {
      acc.groupMember[key] = groupMember.groupMember[key];
    }
    return acc;
  }, {});   
}

function createGroupMemberFunction({ overrides, attributes } = {}) {
  return async () => {
    return await groupMemberResolvers.mutations.addMemberToGroup(
      null,
      fakeGroupMember({ overrides: overrides, attributes: attributes })
    );
  };
}

function updateGroupMemberFunction(id, { overrides, attributes } = {}) {
  return async () => {
    return await groupMemberResolvers.mutations.updateMemberInGroup(null, {
      id: id,
      ...fakeGroupMember({ overrides: overrides, attributes: attributes }),
    });
  };
}

function deleteGroupMemberFunction(id) {
  return async () => {
    return await groupMemberResolvers.mutations.removeMemberFromGroup(null, {
      id: id,
    });
  };
}

function getOneGroupMemberFunction(id) {
  return async () => {
    return await groupMemberResolvers.queries.groupMember(null, { id: id });
  };
}

module.exports = {
  groupMemberResolvers,
  fakeGroupMember,
  createGroupMemberFunction,
  updateGroupMemberFunction,
  deleteGroupMemberFunction,
  getOneGroupMemberFunction,
};
