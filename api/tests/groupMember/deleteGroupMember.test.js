const test = require("ava");
const errors = require("../../resolvers/_errors");
const {
  createGroupMemberFunction,
  deleteGroupMemberFunction,
  getOneGroupMemberFunction,
  groupMemberResolvers,
} = require("./_shared");

const { createArtistFunction } = require("../artist/_shared");

test("deletes a groupMember", async (t) => {
  let group = await createArtistFunction()();
  let member = await createArtistFunction()();
  let persistedGroupMember = await createGroupMemberFunction({
    overrides: {
      groupId: group.id,
      memberId: member.id,
    },
  })();

  await groupMemberResolvers.mutations.removeMemberFromGroup(null, {
    id: persistedGroupMember.id,
  });

  await t.throwsAsync(getOneGroupMemberFunction(persistedGroupMember.id), {
    instanceOf: errors.RecordNotFoundError,
  });
});

test("with nonexistent record fails", async (t) => {
  await t.throwsAsync(deleteGroupMemberFunction(-1), {
    instanceOf: errors.RecordNotFoundError,
  });
});
