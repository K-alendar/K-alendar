const faker = require("faker");
const socialLinksResolvers = require("../../resolvers/socialLinks");

function fakeSocialLinks({ overrides = {}, attributes } = {}) {
  let socialLinks = {
    socialLinks: Object.assign(
      {
        spotify: faker.internet.url(),
        youtube: faker.internet.url(),
        twitter: faker.internet.url(),
      },
      overrides
    ),
  };
  if (!attributes) {
    return socialLinks;
  }
  return Object.keys(socialLinks.socialLinks).reduce((acc, key) => {
    if (attributes.includes(key)) {
      acc.socialLinks[key] = socialLinks.socialLinks[key];
    }
    return acc;
  }, {});
}

function createSocialLinksFunction({ overrides, attributes } = {}) {
  return async () => {
    return await socialLinksResolvers.mutations.createSocialLinks(
      null,
      fakeSocialLinks({ overrides: overrides, attributes: attributes })
    );
  };
}

function updateSocialLinksFunction(id, { overrides, attributes } = {}) {
  return async () => {
    return await socialLinksResolvers.mutations.updateSocialLinks(null, {
      id: id,
      ...fakeSocialLinks({ overrides: overrides, attributes: attributes }),
    });
  };
}

function deleteSocialLinksFunction(id) {
  return async () => {
    return await socialLinksResolvers.mutations.deleteSocialLinks(null, {
      id: id,
    });
  };
}

function getOneSocialLinksFunction(id) {
  return async () => {
    return await socialLinksResolvers.queries.socialLinks(null, { id: id });
  };
}

module.exports = {
  socialLinksResolvers,
  fakeSocialLinks,
  createSocialLinksFunction,
  updateSocialLinksFunction,
  deleteSocialLinksFunction,
  getOneSocialLinksFunction,
};
