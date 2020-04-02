const { artistFactory } = require("./factories");

module.exports = {
  types: {
    Artist: artistFactory.associations()
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
