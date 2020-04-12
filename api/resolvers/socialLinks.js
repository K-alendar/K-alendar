const { socialLinksFactory } = require("./factories");

module.exports = {
  types: {
    SocialLinks: socialLinksFactory.subresolvers()
  },

  queries: {
    socialLinksMultiple: socialLinksFactory.all(),
    socialLinks: socialLinksFactory.one()
  },

  mutations: {
    createSocialLinks: socialLinksFactory.create(),
    updateSocialLinks: socialLinksFactory.update(),
    deleteSocialLinks: socialLinksFactory.destroy()
  }
};
