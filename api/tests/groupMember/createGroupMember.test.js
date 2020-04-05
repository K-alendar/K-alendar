const test = require("ava");
const errors = require("../../resolvers/_errors");
const { createGroupMemberFunction } = require("./_shared");
const { createArtistFunction } = require("../artist/_shared");

test.beforeEach(async (t) => {
  t.context.group = await createArtistFunction()();
  t.context.member = await createArtistFunction()();
});

test("with valid params succedes", async (t) => {
  let groupMember = await createGroupMemberFunction({
    overrides: {
      groupId: t.context.group.id,
      memberId: t.context.group.id,
    },
  })();

  t.truthy(groupMember.id);
  t.truthy(groupMember.memberId);
});

test("with an invalid memberId fails", async (t) => {
  const error = await t.throwsAsync(
    createGroupMemberFunction({
      overrides: { memberId: undefined, groupId: t.context.groupId },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Member id can't be blank/);
});

test("with an invalid groupId fails", async (t) => {
  const error = await t.throwsAsync(
    createGroupMemberFunction({
      overrides: { groupId: undefined, memberId: t.context.member.id },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Group id can't be blank/);
});

test("with non unique parameters fails", async (t) => {
  let persistedGroupMembers = await createGroupMemberFunction({
    overrides: {
      groupId: t.context.group.id,
      memberId: t.context.group.id,
    },
  })();

  const error = await t.throwsAsync(
    createGroupMemberFunction({
      overrides: {
        groupId: persistedGroupMembers.groupId,
        memberId: persistedGroupMembers.memberId,
      },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /groupId must be unique/);
  t.regex(error.message, /memberId must be unique/);
});
