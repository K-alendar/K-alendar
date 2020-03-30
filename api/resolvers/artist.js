const { Artist } = require("../database/models");
const {
  transformers,
  ResolverFactory,
  ParentAssociation,
  ChildAssociation
} = require("./utils");

const artistTransformer = transformers.multi(
  transformers.parseDate("startDate"),
  transformers.parseDate("endDate")
);

const associations = [
  new ParentAssociation("company"),
  new ChildAssociation("members"),
  new ChildAssociation("groups"),
  new ChildAssociation("socialLinks", { autoCreate: true }),
  new ChildAssociation("images", { autoCreate: true })
];

const generator = new ResolverFactory(Artist, {
  transformer: artistTransformer,
  fromObject: "artist",
  associations: associations
});

module.exports = {
  types: {
    Artist: generator.associations()
  },

  queries: {
    artists: generator.all(),
    artist: generator.one()
  },

  mutations: {
    createArtist: generator.create(),
    updateArtist: generator.update(),
    deleteArtist: generator.destroy()
  }
};
