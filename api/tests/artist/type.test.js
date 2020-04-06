const test = require("ava");
const errors = require("../../resolvers/_errors");
const { createArtistFunction, artistResolvers } = require("./_shared");

const { createCompanyFunction } = require("../company/_shared");
const {
  createGroupMemberFunction,
  groupMemberResolvers,
} = require("../groupMember/_shared");

test("of company should return a company", async (t) => {
  let persistedCompany = await createCompanyFunction()();
  let artist = await createArtistFunction({
    overrides: { companyId: persistedCompany.id },
  })();

  let company = await artistResolvers.types.Artist.company(artist);

  t.truthy(company.name);
  t.is(company.id, persistedCompany.id);
});

test("of artistImages should return an artistImages", async (t) => {
  let artist = await createArtistFunction()();
  let persistedArtistImages = artist.images;

  let artistImages = await artistResolvers.types.Artist.images(artist);

  t.truthy(artistImages.cardTall);
  t.is(artistImages.id, persistedArtistImages.id);
});

test("of socialLinks should return a socialLinks", async (t) => {
  let artist = await createArtistFunction()();
  let persistedSocialLinks = artist.socialLinks;

  let socialLinks = await artistResolvers.types.Artist.socialLinks(artist);

  t.truthy(socialLinks.id);
  t.is(socialLinks.id, persistedSocialLinks.id);
});

test("of members should return a list of members", async (t) => {
  let group = await createArtistFunction()();
  let persistedMember = await createArtistFunction()();
  await createGroupMemberFunction({
    overrides: { groupId: group.id, memberId: persistedMember.id },
  })();

  let members = await artistResolvers.types.Artist.members(group);

  t.true(members instanceof Array);
  t.is(members[0].id, persistedMember.id);
});

test("of groups should return a list of groups", async (t) => {
  let member = await createArtistFunction()();
  let persistedGroup = await createArtistFunction()();
  await createGroupMemberFunction({
    overrides: { groupId: persistedGroup.id, memberId: member.id },
  })();

  let groups = await artistResolvers.types.Artist.groups(member);

  t.true(groups instanceof Array);
  t.is(groups[0].id, persistedGroup.id);
});
