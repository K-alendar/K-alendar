const test = require("ava");
const errors = require("../../resolvers/_errors");
const {
  createGroupMemberFunction,
  updateGroupMemberFunction,
  getOneGroupMemberFunction,
} = require("./_shared");
const { createArtistFunction } = require("../artist/_shared");

test.beforeEach(async (t) => {
  let group = await createArtistFunction()();
  let member = await createArtistFunction()();
  t.context.member = member;
  t.context.group = group;
  t.context.persistedGroupMember = await createGroupMemberFunction({
    overrides: {
      groupId: group.id,
      memberId: member.id,
    },
  })();
});

test("with valid params succedes", async (t) => {
  let newGroup = await createArtistFunction()();
  let newMember = await createArtistFunction()();

  let groupMember = await updateGroupMemberFunction(
    t.context.persistedGroupMember.id,
    { overrides: { groupId: newGroup.id, memberId: newMember.id } }
  )();

  t.truthy(groupMember.id);
  t.truthy(groupMember.memberId);
  t.true(groupMember.updatedAt > t.context.persistedGroupMember.updatedAt);
});

test("with an invalid memberID fails", async (t) => {
  const error = await t.throwsAsync(
    updateGroupMemberFunction(t.context.persistedGroupMember.id, {
      overrides: { memberId: undefined },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Member id can't be blank/);
});

test("with an invalid groupId fails", async (t) => {
  const error = await t.throwsAsync(
    updateGroupMemberFunction(t.context.persistedGroupMember.id, {
      overrides: { groupId: undefined },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /Group id can't be blank/);
});

test("with non unique parameters fails", async (t) => {
  let group = await createArtistFunction()();
  let member = await createArtistFunction()();
  let groupMember = await createGroupMemberFunction({
    overrides: {
      groupId: group.id,
      memberId: member.id,
    },
  })();

  const error = await t.throwsAsync(
    updateGroupMemberFunction(groupMember.id, {
      overrides: {
        groupId: t.context.persistedGroupMember.groupId,
        memberId: t.context.persistedGroupMember.memberId,
      },
    }),
    {
      instanceOf: errors.ValidationError,
    }
  );
  t.regex(error.message, /groupId must be unique/);
  t.regex(error.message, /memberId must be unique/);
});
