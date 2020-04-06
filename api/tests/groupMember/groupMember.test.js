const test = require("ava");
const errors = require("../../resolvers/_errors");
const {
  createGroupMemberFunction,
  getOneGroupMemberFunction,
  groupMemberResolvers,
} = require("./_shared");

const { createArtistFunction } = require("../artist/_shared");

test("should return a record", async (t) => {
  let group = await createArtistFunction()();
  let member = await createArtistFunction()();
  let persistedGroupMember = await createGroupMemberFunction({
    overrides: {
      groupId: group.id,
      memberId: member.id,
    },
  })();

  let groupMember = await getOneGroupMemberFunction(persistedGroupMember.id)();

  t.truthy(groupMember.id);
  t.is(groupMember.memberId, persistedGroupMember.memberId);
});

test("with nonexistent record fails", async (t) => {
  await t.throwsAsync(getOneGroupMemberFunction(-1), {
    instanceOf: errors.RecordNotFoundError,
  });
});
