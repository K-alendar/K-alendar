const test = require("ava");
const errors = require("../../resolvers/_errors");
const {
  createGroupMemberFunction,
  groupMemberResolvers,
} = require("./_shared");
const { createArtistFunction } = require("../artist/_shared");

test("of group should return a group", async (t) => {
  let persistedGroup = await createArtistFunction()();
  let member = await createArtistFunction()();
  let groupMember = await createGroupMemberFunction({
    overrides: {
      groupId: persistedGroup.id,
      memberId: member.id,
    },
  })();

  let group = await groupMemberResolvers.types.GroupMember.group(groupMember);

  t.truthy(group.displayName);
  t.is(group.id, persistedGroup.id);
});

test("of member should return a member", async (t) => {
  let persistedMember = await createArtistFunction()();
  let group = await createArtistFunction()();
  let groupMember = await createGroupMemberFunction({
    overrides: {
      groupId: group.id,
      memberId: persistedMember.id,
    },
  })();

  let member = await groupMemberResolvers.types.GroupMember.member(groupMember);

  t.truthy(member.displayName);
  t.is(member.id, persistedMember.id);
});
