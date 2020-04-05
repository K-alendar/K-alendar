const { socialLinksFactory } = require("./factories");

module.exports = {
  types: {
    SocialLinks: socialLinksFactory.associations()
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
