const test = require("ava");
const errors = require("../../resolvers/_errors");
const {
  createGroupMemberFunction,
  groupMemberResolvers,
} = require("./_shared");

const { createArtistFunction } = require("../artist/_shared");

test("should return a list of records", async (t) => {
  let group = await createArtistFunction()();
  let member = await createArtistFunction()();
  await createGroupMemberFunction({
    overrides: {
      groupId: group.id,
      memberId: member.id,
    },
  })();

  let groupMembers = await groupMemberResolvers.queries.groupMembers();

  t.true(groupMembers.length > 0);
  t.true(groupMembers instanceof Array);
  t.truthy(groupMembers[0].id);
});
