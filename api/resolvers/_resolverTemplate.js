const { Model } = require("../database/models");
const {
  transformers,
  ResolverFactory,
  ParentAssociation,
  ChildAssociation
} = require("./utils");

const modelTransformer = transformers.multi(
  transformers.parseDate("modelDate")
);

const associations = [
  new ParentAssociation("parentModel"),
  new ChildAssociation("childModel", { autoCreate: true })
];

const generator = new ResolverFactory(Model, {
  transformer: modelTransformer,
  fromObject: "model",
  associations: associations
});

module.exports = {
  types: {
    Model: generator.associations()
  },

  queries: {
    models: generator.all(),
    model: generator.one()
  },

  mutations: {
    createModel: generator.create(),
    updateModel: generator.update(),
    deleteModel: generator.destroy()
  }
};
