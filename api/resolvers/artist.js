const { artistFactory } = require("./factories");

module.exports = {
  types: {
    Artist: artistFactory.subresolvers()
  },

  queries: {
    artists: artistFactory.all(),
    artist: artistFactory.one()
  },

  mutations: {
    createArtist: artistFactory.create(),
    updateArtist: artistFactory.update(),
    deleteArtist: artistFactory.destroy()
  }
};
